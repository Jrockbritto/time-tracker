import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { HEALTH_CHECK } from '@config/constants/tags.constants';

import { JwtAuthGuard } from '@modules/authentication/guards/jwtAuth.guard';

@Controller()
@ApiTags(HEALTH_CHECK)
export class HealthCheckController {
  @Get()
  @UseGuards(JwtAuthGuard)
  handler() {
    return null;
  }
}
