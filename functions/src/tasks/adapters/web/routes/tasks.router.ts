import { Router } from "express";

import { TasksController } from "../controllers/tasks.controller";
import { validateData } from "../../../../shared/middlewares/validate.middleware";
import { 
    CreateTaskSchema, 
    GetAllTasksSchema, 
    UpdateStatusTasksSchema, 
    UpdateTasksSchema 
} from "../schemas/tasks.schemas";

/** Se definen las rutas del controlador de tareas, para exponerlas **/
export const taskRouter = (controller: TasksController) =>
{
    const router = Router();

    router.get('/tasks', validateData(GetAllTasksSchema), (req,res,next) => controller.getAll(req,res,next))
    router.post('/tasks',validateData(CreateTaskSchema), (req,res,next) => controller.create(req,res,next));
    router.patch('/tasks', validateData(UpdateTasksSchema), (req,res,next) => controller.update(req,res,next));
    router.patch('/tasks/:taskId/complete', validateData(UpdateStatusTasksSchema),(req,res,next) => controller.completeTasks(req,res,next));
    return router;
}