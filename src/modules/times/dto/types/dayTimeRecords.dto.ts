import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { TimeDTO } from './time.dto';

export class DayTimeRecordsDTO {
  @ApiProperty({ type: String, example: '26/04/2023' })
  @IsString()
  date: string;
  @ApiProperty({
    type: TimeDTO,
    example: {
      years: 0,
      months: 0,
      days: 0,
      hours: 5,
      minutes: 51,
      seconds: 20,
    },
  })
  @Type(() => TimeDTO)
  time: TimeDTO;

  @ApiProperty({
    type: [String],
    example: ['2023-04-25T14:17:43.597Z', '2023-04-25T20:17:43.597Z'],
  })
  @ValidateNested({ each: true })
  @IsArray()
  timeArray: string[];

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  journey: number;

  @ApiProperty({ type: Boolean, example: true })
  @IsBoolean()
  @IsOptional()
  firstOfJourney: boolean;
}
