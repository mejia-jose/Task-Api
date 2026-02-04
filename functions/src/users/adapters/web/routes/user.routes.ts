import { Router } from "express";

import { UserController } from "../controllers/user.controller";
import { validateData } from "../../../../shared/middlewares/validate.middleware";
import { UserEmailSchema } from "../schemas/user.schemas";

/** Se definen las rutas del controlador de usuarios, para exponerlas **/
export const userRouter = (controller: UserController) =>
{
    const router = Router();

    router.post('/user/find',validateData(UserEmailSchema), (req,res,next) => controller.findUser(req,res,next));
    router.post('/user',validateData(UserEmailSchema), (req, res, next) => (controller.create(req, res,next)));
    return router;
}