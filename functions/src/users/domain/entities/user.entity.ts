import { v4 as uuidv4} from 'uuid';

export class UserEntity
{
    public readonly id: string;
    public readonly createdAt: Date;

    constructor(
      public email: string,
    )
    {
      this.id = uuidv4();
      this.createdAt = new Date();
    }
}