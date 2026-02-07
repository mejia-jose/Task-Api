/**
 * app.ts – Configuración principal de la API.
 *
 * Inicializa la aplicación, registra middlewares, rutas y dependencias, y asegura que la API funcione correctamente tanto en entornos
 *  locales como en la nube.
**/

import express  from "express";
import rateLimit from "express-rate-limit";
import dotenv from 'dotenv';
import path from "path";

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { db } from "./shared/infrastructure/config/firestore.config";
import { FirestoreUserRepository } from "./users/infrastructure/repositories/firestore.user.repository";
import { FirestoreTasksRepository } from "./tasks/infrastructure/repositories/firestore.tasks.repository";
import { CreateUserUseCase } from "./users/application/use_cases/create-user.usecase";
import { GetUserByEmailUseCase } from "./users/application/use_cases/get-user-by-email.usecase";
import { CreateTasksUseCase } from "./tasks/application/use_cases/create-tasks.usecase";
import { GetAllTasksUseCase } from "./tasks/application/use_cases/get-all-tasks.usecase";
import { UpdateTasksUseCase } from "./tasks/application/use_cases/update-tasks.usecase";
import { MarkTaskCompletedUseCase } from "./tasks/application/use_cases/mark-task-completed.usecase";
import { CancelTaskUseCase } from "./tasks/application/use_cases/cancel-tasks.usecase";
import { UserController } from "./users/adapters/web/controllers/user.controller";
import { TasksController } from "./tasks/adapters/web/controllers/tasks.controller";
import { userRouter } from "./users/adapters/web/routes/user.routes";
import { taskRouter } from "./tasks/adapters/web/routes/tasks.routes";;
import { captureGeneralError } from "./shared/middlewares/error.middleware";
import { corsMiddleware } from "./shared/middlewares/cors.middleware";

/**  Límite de 100 peticiones cada 5 minutos **/
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 100,
  message: "Has excedido el número de solicitudes. Intenta más tarde."
});

const app = express()
app.use(corsMiddleware);
app.use(limiter);
app.use(express.json());

const initializeRoutes = () =>
{
  /** Se instancia el repositorio de la entida User **/
  const userRepository = new FirestoreUserRepository(db);

  /** Se instancian los casos de uso y se les inyecta el repositorio **/
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const getUserByEmailUseCase = new GetUserByEmailUseCase(userRepository)

  /** Se instancia el controllador de User y se le inyectan los casos de uso**/
  const userController = new UserController(createUserUseCase,getUserByEmailUseCase);

  /** Se intancian las rutas para hacer uso del controller de usuarios**/
  const userRoutes = userRouter(userController);

  /** Se instancia el repositorio de la entidad Tasks **/
  const tasksRepository = new FirestoreTasksRepository(db);

  /** Se instancian los casos de uso del módulo de tasks y se les inyecta el repositorio **/
  const createTasksUseCase = new CreateTasksUseCase(tasksRepository,userRepository);
  const getAllTasksUseCase = new GetAllTasksUseCase(tasksRepository);
  const updateTasksUseCase = new UpdateTasksUseCase(tasksRepository);
  const markTaskCompletedUseCase = new MarkTaskCompletedUseCase(tasksRepository);
  const cancelTaskUseCase = new CancelTaskUseCase(tasksRepository);

  /** Se instancia el controllador de User y se le inyectan los casos de uso**/
  const tasksController = new TasksController(
    createTasksUseCase,
    getAllTasksUseCase,
    updateTasksUseCase,
    markTaskCompletedUseCase,
    cancelTaskUseCase
  );

  /** Se intancian las rutas para hacer uso del controller de usuarios**/
  const tasksRoutes = taskRouter(tasksController);

  app.use('/',userRoutes);
  app.use('/', tasksRoutes);  
}

initializeRoutes();

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Api en funcionamiento.',
    version: '1.0.0',
    author: 'Jose Mejia'
  });
});

app.use(captureGeneralError);

export default app;