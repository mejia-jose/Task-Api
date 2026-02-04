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
        private updateAt: Date
    ){}

    static create(title: string, description: string, userId: string): TaskEntity
    {
        const currentDate = new Date();

        return (
            new TaskEntity(
                uuidv4(),
                title,
                description,
                TaskStatus.PENDING,
                userId,
                currentDate,
                currentDate
            )
        )
    }

    update(title: string, description: string): void
    {
        this.title = title;
        this.description = description;
        this.updateAt = new Date();
    }

    updateStatus(status: TaskStatus): void
    {
        this.status = status;
        this.updateAt = new Date();
    }
}