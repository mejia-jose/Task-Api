import { Router } from "express";

import { UserController } from "../controllers/user.controller";

/** Se definen las rutas del controlador de usuarios, para exponerlas **/
export const userRouter = (controller: UserController) =>
{
    const router = Router();

    router.post('/user',(req, res, next) => (controller.create(req, res,next)));
    return router;
}