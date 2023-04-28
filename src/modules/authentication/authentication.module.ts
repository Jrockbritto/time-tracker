import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ENCRYPT_PROVIDER } from '@config/constants/providers.constants';
import { USER_REPOSITORY } from '@config/constants/repositories.constants';

import { BcryptProvider } from '@shared/providers/EncryptProvider/implementations/bcrypt.provider';

import { User } from '@modules/users/entity/User.entity';
import { UserRepository } from '@modules/users/repositories/implementations/user.repository';

import { AuthenticationController } from './contexts/login/authentication.controller';
import { AuthenticationService } from './contexts/login/authentication.service';
import { JwtCookiesStrategy } from './strategies/jwtCookie.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwtSecret'),
        signOptions: {
          expiresIn: configService.get('expiresIn'),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtCookiesStrategy,
    { provide: USER_REPOSITORY, useClass: UserRepository },
    { provide: ENCRYPT_PROVIDER, useClass: BcryptProvider },
  ],
})
export class AutenticationModule {}
