import express  from "express";
import cors from "cors";

import { db } from "./shared/infrastructure/config/firestore.config";
import { FirestoreUserRepository } from "./users/infrastructure/repositories/firestore.user.repository";
import { CreateUserUseCase } from "./users/application/use_cases/create-user.usecase";
import { GetUserByEmailUseCase } from "./users/application/use_cases/get-user-by-email.usecase";
import { UserController } from "./users/adapters/web/controllers/user.controller";
import { userRouter } from "./users/adapters/web/routes/user.routes";
import { captureGeneralError } from "../src/users/adapters/web/middlewares/error.middleware";

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

app.use('/api',userRoutes);
app.use(captureGeneralError);

app.listen(port, () => {
  console.log(`Aplicación corriendo en el puerto: ${port}`)
})
