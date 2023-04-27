import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { USER_REPOSITORY } from '@config/constants/repositories.constants';
import env from '@config/env';

import { IUserRepository } from '@modules/users/repositories/userRepository.interface';

@Injectable()
export class JwtCookiesStrategy extends PassportStrategy(Strategy, 'jwt-cookies') {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req?.cookies?.Authorization]),
      ignoreExpiration: false,
      secretOrKey: env().jwt.token,
    });
  }

  async validate(payload: JwtPayload) {
    const franchise = await this.userRepository.findById(payload.sub);

    if (!franchise) {
      throw new UnauthorizedException();
    }

    return franchise;
  }
}
