import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class ListTimeDTO {
  @ApiProperty({ type: String, example: '1f4ddf6f-2c11-4ba0-80cf-359d5bcd0711' })
  @IsString()
  @IsUUID()
  id: string;
}
