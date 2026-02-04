import { TaskEntity } from "../entities/task.entity";

export interface ITaskRepository
{
    getAllTask(userId: string): Promise<TaskEntity[]>;
    save(task: TaskEntity): Promise<TaskEntity>;
    update(task: TaskEntity): Promise<TaskEntity>;
    delete(id:string): Promise<TaskEntity>;
    getById(id:string): Promise<TaskEntity>
}