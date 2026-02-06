import { Router } from "express";

import { TasksController } from "../controllers/tasks.controller";
import { validateData } from "../../../../shared/middlewares/validate.middleware";
import { 
    CreateTaskSchema, 
    GetAllTasksSchema, 
    UpdateStatusTasksSchema, 
    UpdateTasksSchema 
} from "../schemas/tasks.schemas";
import { isAuthenticated } from "../../../../shared/middlewares/auth.middleware";

/** Se definen las rutas del controlador de tareas, para exponerlas **/
export const taskRouter = (controller: TasksController) =>
{
    const router = Router();

    router.get(
        '/tasks',
        isAuthenticated, 
        validateData(GetAllTasksSchema), 
        (req,res,next) => controller.getAll(req,res,next)
    );

    router.post(
        '/tasks',
        isAuthenticated, 
        validateData(CreateTaskSchema), 
        (req,res,next) => controller.create(req,res,next)
    );

    router.patch(
        '/tasks', 
        isAuthenticated, 
        validateData(UpdateTasksSchema), 
        (req,res,next) => controller.update(req,res,next)
    );

    router.patch(
        '/tasks/:taskId/complete',
        isAuthenticated, 
        validateData(UpdateStatusTasksSchema),
        (req,res,next) => controller.completeTasks(req,res,next)
    );

    router.patch(
        '/tasks/:taskId/cancel', 
        isAuthenticated,
        validateData(UpdateStatusTasksSchema),
        (req,res,next) => controller.cancelTasks(req,res,next)
    );
    
    return router;
}