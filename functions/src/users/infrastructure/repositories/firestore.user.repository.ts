import { UserEntity } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/ports/user.repository.interface";
import { UserMessages } from "../../../shared/constants/messages";

export class FirestoreUserRepository implements IUserRepository
{
    /** Permite guardar la información de un nuevo usuario **/
    async save(user: UserEntity):Promise<UserEntity>
    {
       return user;
    }

    /** Permite obtener la información del usuario por medio del correo electrónico **/
    async getUserByEmail(email: string)
    {
    }
}