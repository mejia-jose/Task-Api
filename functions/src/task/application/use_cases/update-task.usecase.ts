import { TaskEntity } from "../../domain/entities/task.entity";
import { ITaskRepository } from "../../domain/ports/task.repository.interface";
import { UpdateTaskDTO } from "../dtos/task.dto";

export class UpdateTaskUseCase
{
    /** Se inyecta la interfaz del repositorio de task(tareas) **/
    constructor(private readonly taskRepository: ITaskRepository){}
    
    /** Permite ejecutar el caso de uso de actualizar la información de una tarea **/
    async execute(body : UpdateTaskDTO): Promise<TaskEntity>
    {
       const task = await this.taskRepository.getById(body.taskId);

       if(!task)
       {
         throw new Error('Tas not found.');
       }

       task.update(body.title, body.description);

       await this.taskRepository.update(task);
       return task;
    }
}