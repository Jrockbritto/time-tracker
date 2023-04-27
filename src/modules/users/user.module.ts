import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@modules/users/entity/User.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
