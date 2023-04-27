import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '@modules/users/entity/User.entity';

@Entity('times')
export class Time {
  @ApiProperty({
    example: '1f4ddf6f-2c11-4ba0-80cf-359d5bcd0711',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ApiProperty({
    example: 'Doe',
  })
  @ApiProperty({
    example: '2023-04-26T17:17:43.597Z',
  })
  @Column({ name: 'time' })
  time: Date;

  @ApiProperty({ example: new Date() })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ example: new Date() })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty({ example: null })
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => User, (user: User) => user.times)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
