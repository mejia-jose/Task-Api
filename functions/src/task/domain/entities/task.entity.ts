import { v4 as uuidv4 } from 'uuid';

import { TaskStatus } from '../enum/task.status.enum';

export class TaskEntity
{
    constructor(
        public readonly id: string,
        public title: string,
        public description: string,
        public status: TaskStatus,
        public readonly userId: string,
        public createdAt: Date,
        public updatedAt: Date,
        public deleteaAt: Date | null = null,
    ){}

    static create(title: string, description: string, userId: string): TaskEntity
    {
        return (
            new TaskEntity(
                uuidv4(),
                title,
                description,
                TaskStatus.PENDING,
                userId,
                TaskEntity.getDate(),
                TaskEntity.getDate(),
                null
            )
        )
    }

    protected static getDate(): Date
    {
       return new Date();
    }

    update(title: string, description: string): void
    {
        this.title = title;
        this.description = description;
        this.updatedAt = TaskEntity.getDate();
    }

    updateStatus(status: TaskStatus): void
    {
        const currentDate = TaskEntity.getDate();
        this.status = status;
        this.updatedAt = currentDate;
        this.deleteaAt = currentDate;
    }
}