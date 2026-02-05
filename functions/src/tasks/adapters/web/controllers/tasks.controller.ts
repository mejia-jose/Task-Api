import { Request, Response, NextFunction } from "express";

import { CreateTasksUseCae } from "../../../application/use_cases/create-tasks.usecase";
import { GetAllTasksUseCase } from "../../../application/use_cases/get-all-tasks.usecase";
import { UpdateStatusTasksUseCase } from "../../../application/use_cases/update-status-tasks.usecase";
import { UpdateTasksUseCase } from "../../../application/use_cases/update-tasks.usecase";
import { TaskMessages } from "../../../../shared/constants/messages";
import { MapResponse } from "../../../../shared/responses/response";

export class TasksController
{
    constructor(
        private createTasksUseCase: CreateTasksUseCae,
        private getAllTasksUseCase: GetAllTasksUseCase,
        private updateTasksTaskUseCase: UpdateStatusTasksUseCase,
        private updateTasksUseCase: UpdateTasksUseCase,
    )
    {}

    /** Permite delegar al caso de uso de crear tareas y retornar la respuesta  **/
    async create(req: Request, res:Response, next: NextFunction)
    {
        try 
        {
            const { title, description, userId } = req.body;

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