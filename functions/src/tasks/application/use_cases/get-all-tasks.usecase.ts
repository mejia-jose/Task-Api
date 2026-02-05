import { TasksEntity } from "../../domain/entities/tasks.entity";
import { ITasksRepository } from "../../domain/ports/tasks.repository.interface";

export class GetAllTasksUseCase
{
    /** Se inyecta la interfaz del repositorio de task(tareas) **/
    constructor(private readonly taskRepository: ITasksRepository){}
    
    /** Permite ejecutar el caso de uso de obtener las tareas asociadas a un usuario **/
    async execute(userId:string): Promise<TasksEntity[]>
    {
       return await this.taskRepository.getAllByUser(userId);
    }
}