import { TasksEntity } from "../../domain/entities/tasks.entity";
import { ITasksRepository } from "../../domain/ports/tasks.repository.interface";
import { CreateTaskDTO } from "../dtos/tasks.dto";

export class CreateTasksUseCase
{
    /** Se inyecta la interfaz del repositorio de task(tareas) **/
    constructor(private readonly taskRepository: ITasksRepository){}
    
    /** Permite ejecutar el caso de uso de crear una tarea **/
    async execute(task:CreateTaskDTO): Promise<TasksEntity>
    {
        const description = task.description ?? null;
        /** Se instancia la nueva clase para la nueva tarea **/
        const newTask = TasksEntity.create(
            task.title,
            description,
            task.userId
        );

        /** Se crea la tarea **/
        await this.taskRepository.save(newTask);
        return newTask;
    }
}