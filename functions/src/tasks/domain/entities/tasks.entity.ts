import { v4 as uuidv4 } from 'uuid';

import { TaskStatus } from '../enum/tasks.status.enum';
import { TaskMessages } from '../../../shared/constants/messages';

export class TasksEntity
{
    constructor(
        public readonly id: string,
        public title: string,
        public description: string,
        public status: TaskStatus,
        public readonly userId: string,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date | null = null,
    ){}

    static create(title: string, description: string, userId: string): TasksEntity
    {
        return (
            new TasksEntity(
                uuidv4(),
                title,
                description,
                TaskStatus.PENDING,
                userId,
                new Date(),
                new Date(),
                null
            )
        )
    }

    update(title: string, description: string): void
    {
        if (this.status === TaskStatus.CANCELLED) { 
            throw new Error(TaskMessages.ERROR.TASK_CANNOT_BE_UPDATED); 
        }

        this.title = title;
        this.description = description;
        this.updatedAt = new Date();
    }

    updateStatus(status: TaskStatus): void
    {
        if(this.status === TaskStatus.CANCELLED)
        {
            throw new Error(TaskMessages.ERROR.TASK_STATUS_NOT_CHANGE);
        }

        const currentDate = new Date();
        if(status === TaskStatus.CANCELLED)
        {
            this.deletedAt = currentDate;
        }
        this.status = status;
        this.updatedAt = currentDate;
    }
}