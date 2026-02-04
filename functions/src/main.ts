import express  from "express";
import cors from "cors";

import { FirestoreUserRepository } from "./users/infrastructure/repositories/user.repository";
import { CreateUserUseCase } from "./users/application/use_cases/create-user.usecase";
import { UserController } from "./users/interfaces/controllers/user.controller";
import { userRouter } from "./users/interfaces/routes/user.routes";

const app = express()
app.use(cors());
app.use(express.json());
const port = 3000;

/** Se instancia el repositorio de la entida User **/
const userRepository = new FirestoreUserRepository();

/** Se instancian los casos de uso y se les inyecta el repositorio **/
const createUserUseCase = new CreateUserUseCase(userRepository);

/** Se instancia el controllador de User y se le inyectan los casos de uso**/
const userController = new UserController(createUserUseCase);

/** Se intancian las rutas para hacer uso del controller de usuarios**/
const userRoutes = userRouter(userController);

app.use('/api',userRoutes);

app.listen(port, () => {
  console.log(`Aplicación corriendo en el puerto: ${port}`)
})
