import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { TIME } from '@config/constants/tags.constants';

import { JwtAuthGuard } from '@modules/authentication/guards/jwtAuth.guard';
import { ListTimeDTO } from '@modules/times/dto/listTime.dto';
import { DayTimeRecordsDTO } from '@modules/times/dto/types/dayTimeRecords.dto';

import { ListTimeService } from './listTime.service';

@Controller(TIME.toLowerCase())
@ApiTags(TIME)
export class ListTimeController {
  constructor(private readonly listTimeService: ListTimeService) {}
  @Get('users/:id')
  @ApiOkResponse({ type: [DayTimeRecordsDTO] })
  @UseGuards(JwtAuthGuard)
  handler(@Param() { id }: ListTimeDTO) {
    return this.listTimeService.execute({ id });
  }
}
