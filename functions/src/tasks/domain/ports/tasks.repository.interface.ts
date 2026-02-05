import { TasksEntity } from "../entities/tasks.entity";
import { TaskStatus } from "../enum/tasks.status.enum";

export interface ITasksRepository
{
    getAllByUser(userId: string): Promise<TasksEntity[]>;
    save(task: TasksEntity): Promise<TasksEntity>;
    update(task: TasksEntity): Promise<TasksEntity>;
    updateStatus(id: string, status: TaskStatus): Promise<{ id: string, status: TaskStatus}>;
    getById(id:string): Promise<TasksEntity | null>
}