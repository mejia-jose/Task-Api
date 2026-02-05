import { TasksEntity } from "../../domain/entities/tasks.entity";
import { ITasksRepository } from "../../domain/ports/tasks.repository.interface";
import { UpdateStatusTaskDTO } from "../dtos/tasks.dto";

export class UpdateStatusTasksUseCase
{
    /** Se inyecta la interfaz del repositorio de task(tareas) **/
    constructor(private readonly taskRepository: ITasksRepository){}
    
    /** Permite ejecutar el caso de uso de actualizar el estado de una tarea **/
    async execute(body : UpdateStatusTaskDTO): Promise<TasksEntity>
    {
        const task = await this.taskRepository.getById(body.taskId);

       if(!task)
       {
         throw new Error('Tas not found.');
       }

       task.updateStatus(body.status);

       await this.taskRepository.update(task);
       return task;
    }
}