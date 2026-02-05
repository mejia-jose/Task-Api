import { TaskEntity } from "../../domain/entities/task.entity";
import { ITaskRepository } from "../../domain/ports/task.repository.interface";
import { CreateTaskDTO } from "../dtos/task.dto";

export class CreateTaskUseCae
{
    /** Se inyecta la interfaz del repositorio de task(tareas) **/
    constructor(private readonly taskRepository: ITaskRepository){}
    
    /** Permite ejecutar el caso de uso de crear una tarea **/
    async execute(task:CreateTaskDTO): Promise<TaskEntity>
    {
        /** Se instancia la nueva clase para la nueva tarea **/
        const newTask = TaskEntity.create(
            task.title,
            task.description,
            task.userId
        );

        /** Se crea la tarea **/
        await this.taskRepository.save(newTask);
        return newTask;
    }
}