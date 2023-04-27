import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TIME_REPOSITORY } from '@config/constants/repositories.constants';

import { CreateTimeController } from './contexts/createTime/createTime.controller';
import { CreateTimeService } from './contexts/createTime/createTime.service';
import { ListTimeController } from './contexts/listTime/listTime.controller';
import { ListTimeService } from './contexts/listTime/listTime.service';
import { Time } from './entity/Time.entity';
import { TimeRespository } from './repositories/implementations/time.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Time])],
  controllers: [CreateTimeController, ListTimeController],
  providers: [
    { provide: TIME_REPOSITORY, useClass: TimeRespository },
    CreateTimeService,
    ListTimeService,
  ],
})
export class TimeModule {}
