import { v4 as uuidv4} from 'uuid';

export class UserEntity
{
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly createdAt: Date,
  ){}

  static create(email: string): UserEntity
  {
    return (new UserEntity(uuidv4(),email.toLowerCase().trim(),new Date()));
  }
}