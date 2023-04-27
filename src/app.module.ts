import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { datasourceOptions } from '@config/typeorm';

import { AuthModule } from '@modules/authentication/auth.module';
import { HealthCheckModule } from '@modules/healthCheck/healthCheck.module';
import { TimeModule } from '@modules/times/time.module';
import { UserModule } from '@modules/users/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...datasourceOptions, autoLoadEntities: true }),
    UserModule,
    HealthCheckModule,
    AuthModule,
    TimeModule,
  ],
})
export class AppModule {}
