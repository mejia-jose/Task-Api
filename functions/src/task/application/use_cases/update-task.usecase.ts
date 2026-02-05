import { TaskEntity } from "../../domain/entities/task.entity";
import { ITaskRepository } from "../../domain/ports/task.repository.interface";

export class UpdateTaskUseCase
{
    /** Se inyecta la interfaz del repositorio de task(tareas) **/
    constructor(private readonly taskRepository: ITaskRepository){}
    
    /** Permite ejecutar el caso de uso de actualizar la información de una tarea **/
    async execute(task:TaskEntity): Promise<TaskEntity>
    {
       
    }
}