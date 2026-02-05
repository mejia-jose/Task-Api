import { TaskStatus } from "../../domain/enum/tasks.status.enum";

export interface CreateTaskDTO
{
    title: string,
    description: string,
    userId: string
}

export interface UpdateTaskDTO
{
    tasksId: string;
    title: string;
    description: string;
}

export interface UpdateStatusTaskDTO
{
    tasksId: string;
    status:TaskStatus
}