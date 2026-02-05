import { TasksEntity } from "../../domain/entities/tasks.entity";
import { ITasksRepository } from "../../domain/ports/tasks.repository.interface";
import { TaskMessages } from "../../../shared/constants/messages";
import { TaskStatus } from "../../domain/enum/tasks.status.enum";

export class MarkTaskCompletedUseCase
{
  /** Se inyecta la interfaz del repositorio de task(tareas) **/
  constructor(private readonly taskRepository: ITasksRepository){}
  
  /** Permite ejecutar el caso de uso de actualizar el estado de una tarea **/
  async execute(tasksId: string): Promise<TasksEntity>
  {
    const task = await this.taskRepository.getById(tasksId);

    if(!task)
    {
      throw new Error(TaskMessages.ERROR.TASK_NOT_FOUND);
    }

    if(task.status === TaskStatus.COMPLETED)
    {
      throw new Error(TaskMessages.ERROR.TASK_ALREADY_COMPLETED)
    }

    task.updateStatus(TaskStatus.COMPLETED);

    await this.taskRepository.updateStatus(task.id, task.status);
    return task;
  }
}