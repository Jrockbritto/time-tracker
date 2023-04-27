import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class TimeDTO {
  @ApiProperty({ type: Number, example: 0 })
  @IsNumber()
  years: number;

  @ApiProperty({ type: Number, example: 0 })
  @IsNumber()
  months: number;

  @ApiProperty({ type: Number, example: 0 })
  @IsNumber()
  days: number;

  @ApiProperty({ type: Number, example: 3 })
  @IsNumber()
  hours: number;

  @ApiProperty({ type: Number, example: 30 })
  @IsNumber()
  minutes: number;

  @ApiProperty({ type: Number, example: 27 })
  @IsNumber()
  seconds: number;
}
