import { User } from '@modules/users/entity/User.entity';

import { ICreateUserDTO } from '../dto/ICreateUser.interface';
import { IFindOneUser } from '../dto/IFindOne.interface';

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User>;
  findOne(dto: IFindOneUser): Promise<User>;
}
