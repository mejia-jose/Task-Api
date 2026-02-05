import { TaskEntity } from "../entities/task.entity";
import { TaskStatus } from "../enum/task.status.enum";

export interface ITaskRepository
{
    getAllByUser(userId: string): Promise<TaskEntity[]>;
    save(task: TaskEntity): Promise<TaskEntity>;
    update(task: TaskEntity): Promise<TaskEntity>;
    updateStatus(id: string, status: TaskStatus): Promise<{ id: string, status: TaskStatus}>;
    getById(id:string): Promise<TaskEntity | null>
}