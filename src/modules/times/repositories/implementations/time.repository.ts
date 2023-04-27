import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ICreateTimeDTO } from '@modules/times/dto/ICreateTime.dto';
import { IFindTimeDTO } from '@modules/times/dto/IFindTime.dto';
import { Time } from '@modules/times/entity/Time.entity';

import { ITimeRepository } from '../timeRepository.interface';

export class TimeRespository implements ITimeRepository {
  constructor(
    @InjectRepository(Time)
    private readonly repository: Repository<Time>,
  ) {}

  async create({ userId, time }: ICreateTimeDTO): Promise<Time> {
    const timeEntity = this.repository.create({ userId, time });
    return this.repository.save(timeEntity);
  }
  async find({ userId }: IFindTimeDTO): Promise<Time[]> {
    const time = await this.repository.find({
      where: { userId },
      order: { time: 'ASC' },
    });
    return time;
  }
  async delete(timeId: string): Promise<Time> {
    const time = await this.repository.findOne({ where: { id: timeId } });
    time.deletedAt = new Date();
    return this.repository.save(time);
  }
}
