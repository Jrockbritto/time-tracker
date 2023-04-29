import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsOptional, ValidateNested } from 'class-validator';

import { DayTimeRecordsDTO } from './types/dayTimeRecords.dto';

export class CreateTimeRequestDTO {
  @ApiProperty({ type: Date, example: '2023-04-26T17:17:43.597Z' })
  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  @IsOptional()
  time: Date;
}

export class CreteTimeResponseDTO {
  @ApiProperty({ type: [DayTimeRecordsDTO] })
  @Type(() => DayTimeRecordsDTO)
  @ValidateNested({ each: true })
  times: DayTimeRecordsDTO[];
}
