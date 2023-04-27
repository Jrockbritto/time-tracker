import { Inject, Injectable } from '@nestjs/common';

import { TIME_REPOSITORY } from '@config/constants/repositories.constants';

import { ICreateTimeDTO } from '@modules/times/dto/ICreateTime.dto';
import { Time } from '@modules/times/entity/Time.entity';
import { ITimeRepository } from '@modules/times/repositories/timeRepository.interface';

@Injectable()
export class CreateTimeService {
  constructor(
    @Inject(TIME_REPOSITORY)
    private readonly timeRepository: ITimeRepository,
  ) {}
  execute({ userId, time = new Date() }: ICreateTimeDTO): Promise<Time> {
    return this.timeRepository.create({ userId, time: time });
  }
}
