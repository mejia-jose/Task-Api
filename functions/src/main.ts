import express  from "express";
import cors from "cors";

import { db } from "./shared/infrastructure/config/firestore.config";
import { FirestoreUserRepository } from "./users/infrastructure/repositories/firestore.user.repository";
import { FirestoreTasksRepository } from "./tasks/infrastructure/repositories/firestore.tasks.repository";
import { CreateUserUseCase } from "./users/application/use_cases/create-user.usecase";
import { GetUserByEmailUseCase } from "./users/application/use_cases/get-user-by-email.usecase";
import { CreateTasksUseCase } from "./tasks/application/use_cases/create-tasks.usecase";
import { GetAllTasksUseCase } from "./tasks/application/use_cases/get-all-tasks.usecase";
import { UpdateTasksUseCase } from "./tasks/application/use_cases/update-tasks.usecase";
import { UpdateStatusTasksUseCase } from "./tasks/application/use_cases/update-status-tasks.usecase";
import { UserController } from "./users/adapters/web/controllers/user.controller";
import { TasksController } from "./tasks/adapters/web/controllers/tasks.controller";
import { userRouter } from "./users/adapters/web/routes/user.routes";
import { taskRouter } from "./tasks/adapters/web/routes/tasks.router";;
import { captureGeneralError } from "./shared/middlewares/error.middleware";

const app = express()
app.use(cors());
app.use(express.json());
const port = 3000;

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
const createTasksUseCase = new CreateTasksUseCase(tasksRepository);
const getAllTasksUseCase = new GetAllTasksUseCase(tasksRepository);
const updateTasksUseCase = new UpdateTasksUseCase(tasksRepository);
const updateStatusTasksUseCase = new UpdateStatusTasksUseCase(tasksRepository);

/** Se instancia el controllador de User y se le inyectan los casos de uso**/
const tasksController = new TasksController(createTasksUseCase,getAllTasksUseCase,updateTasksUseCase,updateStatusTasksUseCase);

/** Se intancian las rutas para hacer uso del controller de usuarios**/
const tasksRoutes = taskRouter(tasksController);


app.use('/api',userRoutes);
app.use('/api', tasksRoutes);
app.use(captureGeneralError);

app.listen(port, () => {
  console.log(`Aplicación corriendo en el puerto: ${port}`)
})
