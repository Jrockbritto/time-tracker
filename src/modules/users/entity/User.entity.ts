import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Time } from '@modules/times/entity/Time.entity';

@Entity('users')
export class User {
  @ApiProperty({
    example: '1f4ddf6f-2c11-4ba0-80cf-359d5bcd0711',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'John',
  })
  @Column({ name: 'name' })
  name: string;

  @ApiProperty({
    example: 'Doe',
  })
  @Column({ name: 'last_name' })
  lastName: string;

  @ApiProperty({
    example: 'email@email.com',
  })
  @Column({ name: 'email' })
  email: string;

  @ApiHideProperty()
  @Column({ name: 'password' })
  @Exclude()
  password: string;

  @ApiProperty({ example: new Date() })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ example: new Date() })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty({ example: null })
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => Time, (Time: Time) => Time.user)
  times: Time[];
}
