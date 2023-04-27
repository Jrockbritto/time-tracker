import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/users/dto/ICreateUser.interface';
import { IFindOneUser } from '@modules/users/dto/IFindOne.interface';
import { User } from '@modules/users/entity/User.entity';

import { IUserRepository } from '../userRepository.interface';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(data: ICreateUserDTO): Promise<User> {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }

  async findById(id: string): Promise<User> {
    return this.repository.findOne({ where: { id } });
  }

  async findOne(dto: IFindOneUser): Promise<User> {
    return this.repository.findOne({ where: { ...dto } });
  }
}
