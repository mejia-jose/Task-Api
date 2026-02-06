import { UserMessages } from "../../../shared/constants/messages";
import { IUserRepository } from "../../../users/domain/ports/user.repository.interface";
import { TasksEntity } from "../../domain/entities/tasks.entity";
import { ITasksRepository } from "../../domain/ports/tasks.repository.interface";
import { CreateTaskDTO } from "../dtos/tasks.dto";

export class CreateTasksUseCase
{
    /** Se inyecta la interfaz del repositorio de task(tareas) **/
    constructor(
        private readonly taskRepository: ITasksRepository, 
        private readonly userRepository: IUserRepository,
    ){}
    
    /** Permite ejecutar el caso de uso de crear una tarea **/
    async execute(task:CreateTaskDTO): Promise<TasksEntity>
    {
        const user = await this.userRepository.getUserById(task.userId);

        if(!user)
        {
            throw new Error(UserMessages.ERROR.USER_NOT_FOUND_ID);
        }

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