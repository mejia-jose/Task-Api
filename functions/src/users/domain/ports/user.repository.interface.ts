import { UserEntity } from "../entities/user.entity";

/** Se define el contrato del repositorio de User **/
export interface IUserRepository
{
    save(user:UserEntity):Promise<UserEntity>;
    getUserByEmail(email:string):Promise<UserEntity | null>;
}