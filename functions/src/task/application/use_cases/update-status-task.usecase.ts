import { TaskEntity } from "../../domain/entities/task.entity";
import { TaskStatus } from "../../domain/enum/task.status.enum";
import { ITaskRepository } from "../../domain/ports/task.repository.interface";
import { UpdateStatusTaskDTO } from "../dtos/task.dto";

export class UpdateStatusTaskUseCase
{
    /** Se inyecta la interfaz del repositorio de task(tareas) **/
    constructor(private readonly taskRepository: ITaskRepository){}
    
    /** Permite ejecutar el caso de uso de actualizar el estado de una tarea **/
    async execute(body : UpdateStatusTaskDTO): Promise<TaskEntity>
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