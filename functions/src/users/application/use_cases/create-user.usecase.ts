import { UserEntity } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/ports/user.repository.interface";

export class CreateUserUseCase
{
  /** Se inyecta la interfaz del repositorio de usuarios **/
  constructor(private readonly userRepository: IUserRepository){}

  /** Permite ejecutar el caso de uso de crear usuario **/
  async execute(email:string, name: string): Promise<UserEntity>
  {
    /** Se consulta el usuario, si existe se retorna **/
    const existingUser = await this.userRepository.getUserByEmail(email);
    if(existingUser)
    {
      return existingUser;
    }

    /** Se crea el usuario **/
    const newUser = UserEntity.create(email, name);
    await this.userRepository.save(newUser);
    return newUser;
  }
}