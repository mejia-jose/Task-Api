import { TaskEntity } from "../../domain/entities/task.entity";
import { ITaskRepository } from "../../domain/ports/task.repository.interface";

export class GetAllTaskUseCase
{
    /** Se inyecta la interfaz del repositorio de task(tareas) **/
    constructor(private readonly taskRepository: ITaskRepository){}
    
    /** Permite ejecutar el caso de uso de obtener las tareas asociadas a un usuario **/
    async execute(userId:string): Promise<TaskEntity[]>
    {
       return await this.taskRepository.getAllByUser(userId);
    }
}