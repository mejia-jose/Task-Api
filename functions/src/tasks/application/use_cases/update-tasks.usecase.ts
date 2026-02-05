import { TaskMessages } from "../../../shared/constants/messages";
import { TasksEntity } from "../../domain/entities/tasks.entity";
import { ITasksRepository } from "../../domain/ports/tasks.repository.interface";
import { UpdateTaskDTO } from "../dtos/tasks.dto";

export class UpdateTasksUseCase
{
    /** Se inyecta la interfaz del repositorio de task(tareas) **/
    constructor(private readonly taskRepository: ITasksRepository){}
    
    /** Permite ejecutar el caso de uso de actualizar la información de una tarea **/
    async execute(body : UpdateTaskDTO): Promise<TasksEntity>
    {
       const task = await this.taskRepository.getById(body.taskId);

       if(!task)
       {
         throw new Error(TaskMessages.ERROR.TASK_NOT_FOUND);
       }

       task.update(body.title, body.description);

       await this.taskRepository.update(task);
       return task;
    }
}