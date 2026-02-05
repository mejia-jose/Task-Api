import { Request, Response, NextFunction } from "express";

import { TasksEntity } from "../../../domain/entities/tasks.entity";
import { CreateTasksUseCase } from "../../../application/use_cases/create-tasks.usecase";
import { GetAllTasksUseCase } from "../../../application/use_cases/get-all-tasks.usecase";
import { MarkTaskCompletedUseCase } from "../../../application/use_cases/mark-task-completed.usecase";
import { UpdateTasksUseCase } from "../../../application/use_cases/update-tasks.usecase";
import { CancelTaskUseCase } from "../../../application/use_cases/cancel-tasks.usecase";
import { TaskMessages } from "../../../../shared/constants/messages";
import { MapResponse } from "../../../../shared/responses/response";

export class TasksController
{
    constructor(
        private createTasksUseCase: CreateTasksUseCase,
        private getAllTasksUseCase: GetAllTasksUseCase,
        private updateTasksUseCase: UpdateTasksUseCase,
        private markTaskCompletedUseCase: MarkTaskCompletedUseCase,
        private cancelTaskUseCase: CancelTaskUseCase,
    )
    {}

    /** Permite obtener todas las tareas de un usuario y retornarlas **/
    async getAll(req: Request, res: Response, next: NextFunction)
    {
        try 
        {
            const { userId } = req.query as { userId: string };
            const tasks = await this.getAllTasksUseCase.execute(userId!);

            return res.status(200).json({
                success: true,
                messages: TaskMessages.SUCCESS.LIST_TASKS,
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

    /** Permite delegar al caso de uso de actualizar tareas y retornar la respuesta */
    async update(req: Request, res: Response, next: NextFunction)
    {
        try 
        {
            const { taskId, title, description } = req.body;

            const updatedTask = await this.updateTasksUseCase.execute({
                taskId,
                title,
                description,
            });

            return res.status(200).json(
                MapResponse.ResultJson({
                    type: true,
                    messages: TaskMessages.SUCCESS.TASK_UPDATED,
                    data: updatedTask
                })
            );

        } catch (error) {
            next(error);
        }
    }

    /** Permite delegar al caso de uso de actualizar el estado de una tarea a completada y retornar la respuesta */
    async completeTasks(req: Request, res: Response, next: NextFunction)
    {
        return await this.updateStatus(req, res, next,this.markTaskCompletedUseCase, TaskMessages.SUCCESS.TASK_UPDATED);
    }

    /** Permite delegar al caso de uso de actualizar el estado de una tarea a cancelada y retornar la respuesta */
    async cancelTasks(req: Request, res: Response, next: NextFunction)
    {
        return await this.updateStatus(req, res, next,this.cancelTaskUseCase,TaskMessages.SUCCESS.TASK_CANCELLED);
    }

    private async updateStatus(req: Request, 
        res: Response, 
        next: NextFunction,
        useCase: { execute: (taskId: string) => Promise<TasksEntity> },
        messages: string)
    {
        try 
        {
            const { taskId } = req.params as { taskId: string};

            const updateStatus = await useCase.execute(taskId);

            return res.status(200).json(
                MapResponse.ResultJson({
                    type: true,
                    messages,
                    data: updateStatus
                })
            );

        } catch (error) {
            next(error);
        }
    }
}