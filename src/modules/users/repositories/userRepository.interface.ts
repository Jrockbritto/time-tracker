import { User } from '@modules/users/entity/User.entity';

import { ICreateUserDTO } from '../dto/ICreateUser.interface';

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
