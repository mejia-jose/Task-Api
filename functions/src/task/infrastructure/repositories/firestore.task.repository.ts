import { firestore } from "firebase-admin";

import { TaskEntity } from "../../domain/entities/task.entity";
import { ITaskRepository } from "../../domain/ports/task.repository.interface";
import { TaskStatus } from "../../domain/enum/task.status.enum";

export class FirestoreTaskRepository implements ITaskRepository
{
    private readonly collection;
    constructor(private readonly db: firestore.Firestore)
    {
       this.collection = this.db.collection('task');
    }
    
    /**Permite obtener todas las tareas de un usuario  **/
    async getAllByUser(userId: string): Promise<TaskEntity[]>
    {
        const dataCollection = await this.collection
        .where('userId', '==', userId)
        .where('status', '!=', TaskStatus.CANCELLED)
        .orderBy('status')
        .orderBy('createdAt','asc')
        .get();

        if (dataCollection.empty) return [];

        return dataCollection.docs.map(doc => {
            const data = doc.data();

            return new TaskEntity(
               data.id,
                data.title,
                data.description,
                data.status,
                data.userId,
                data.createdAt.toDate(),
                data.updatedAt.toDate()
            );
        });
    }

    /** Permite guardar la información de una nueva tarea **/
    async save(task: TaskEntity):Promise<TaskEntity>
    {
        await this.collection.doc(task.id).set(
        {
           id: task.id,
           title: task.title,
           description: task.description,
           status: task.status,
           userId: task.userId,
           createdAt: task.createdAt,
           updateAt: task.createdAt
        })
       return task;
    }

    /** Permite modificar la información de una tarea por medio del ID en la base de datos **/
    async update(task: TaskEntity): Promise<TaskEntity>
    {
        const taskRef = this.collection.doc(task.id);
        await taskRef.update(
        {
            title: task.title,
            description: task.description,
            updateAt: task.updatedAt
        });
        return task;
    }

    /** Permite modificar el estado de una tarea en la base de datos **/
    async updateStatus(id: string, status: TaskStatus): Promise<{id: string, status: TaskStatus}>
    {
        const taskRef = this.collection.doc(id);

        const updateData: any = {
            status,
            updatedAt: new Date(),
        };

        if (status === TaskStatus.CANCELLED)
        {
            updateData.deletedAt = new Date();
        }

        await taskRef.update(updateData);
        return { id, status };
    }

    /** Permite obtener una tarea por su id **/
    async getById(id: string): Promise<TaskEntity | null>
    {
        const document = await this.collection.doc(id).get();

        if (!document.exists) return null;

        const data = document.data()!;

        return new TaskEntity(
            document.id,
            data.title,
            data.description,
            data.status,
            data.userId,
            data.createdAt.toDate(),
            data.updatedAt.toDate()
        );
    }
}