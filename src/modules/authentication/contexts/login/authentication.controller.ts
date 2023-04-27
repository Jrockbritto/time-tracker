import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { addSeconds } from 'date-fns';
import { Response } from 'express';

import { AUTHENTICATION } from '@config/constants/tags.constants';
import env from '@config/env';

import { LoginRequestDTO } from '@modules/authentication/dto/login.dto';
import { User } from '@modules/users/entity/User.entity';

import { AuthService } from './authentication.service';

@Controller(AUTHENTICATION.toLowerCase())
@ApiTags(AUTHENTICATION)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiCreatedResponse({ type: User })
  @Post('login')
  async handler(@Body() dto: LoginRequestDTO, @Res({ passthrough: true }) response: Response) {
    const { user, token } = await this.authService.execute(dto);

    response.cookie('Authorization', token, {
      domain: env().domain,
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: true,
      expires: addSeconds(new Date(Date.now()), parseInt(env().jwt.expiresIn)),
    });

    return {
      user: plainToInstance(User, user),
    };
  }
}
