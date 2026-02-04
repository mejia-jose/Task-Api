import { IUserRepository } from "../../domain/ports/user.repository.interface";

export class GetUserByEmailUseCase
{
    /** Se inyecta la interfaz del repositorio de usuarios **/
    constructor(private readonly userRepository: IUserRepository){}

    /** Permite ejecutar el caso de uso para obtener la información de un usuario **/
    async execute(email:string)
    {
        /** Se consulta si el usuario existe **/
        const existingUser = await this.userRepository.getUserByEmail(email);
        if(!existingUser) 
            return null;
        
        return existingUser;
    }
}