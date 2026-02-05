import { Router } from "express";

import { TasksController } from "../controllers/tasks.controller";
import { validateData } from "../../../../shared/middlewares/validate.middleware";
import { CreateTaskSchema } from "../schemas/tasks.schemas";

/** Se definen las rutas del controlador de tareas, para exponerlas **/
export const taskRouter = (controller: TasksController) =>
{
    const router = Router();

    router.post('/tasks',validateData(CreateTaskSchema), (req,res,next) => controller.create(req,res,next));
    return router;
}