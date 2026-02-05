import { Request, Response, NextFunction } from "express";

import { CreateTasksUseCase } from "../../../application/use_cases/create-tasks.usecase";
import { GetAllTasksUseCase } from "../../../application/use_cases/get-all-tasks.usecase";
import { UpdateStatusTasksUseCase } from "../../../application/use_cases/update-status-tasks.usecase";
import { UpdateTasksUseCase } from "../../../application/use_cases/update-tasks.usecase";
import { TaskMessages } from "../../../../shared/constants/messages";
import { MapResponse } from "../../../../shared/responses/response";

export class TasksController
{
    constructor(
        private createTasksUseCase: CreateTasksUseCase,
        private getAllTasksUseCase: GetAllTasksUseCase,
        private updateTasksUseCase: UpdateTasksUseCase,
         private updateTasksTaskUseCase: UpdateStatusTasksUseCase,
    )
    {}

    /** Permite obtener todas las tareas de un usuario y retornarlas **/
    async getAll(req: Request, res: Response, next: NextFunction)
    {
        try 
        {
            const { userId } = req.query;

            if (!userId || typeof userId !== "string") {
                return res.status(400).json({
                    success: false,
                    messages: "El userId es obligatorio y debe ser un string",
                    data: []
                });
            }

            const tasks = await this.getAllTasksUseCase.execute(userId);

            return res.status(200).json({
                success: true,
                messages: "Listado de tareas obtenido correctamente",
                data: tasks
            });
            
        } catch (error) {
            next(error);
        }
    }

    /** Permite delegar al caso de uso de crear tareas y retornar la respuesta  **/
    async create(req: Request, res:Response, next: NextFunction)
    {
        try 
        {
            const { title, description, userId } = req?.body;

            const task = await this.createTasksUseCase.execute({title,description,userId});

            return res.status(201).json(
                MapResponse.ResultJson({
                    type: true,
                    messages: TaskMessages.SUCCESS.TASK_CREATED,
                    data: task
                })
            );
        } catch (error) {
            next(error);
        }
    }
}