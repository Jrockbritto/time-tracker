import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { datasourceOptions } from '@config/typeorm';

import { AutenticationModule } from '@modules/authentication/authentication.module';
import { HealthCheckModule } from '@modules/healthCheck/healthCheck.module';
import { TimeModule } from '@modules/times/time.module';
import { UserModule } from '@modules/users/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...datasourceOptions, autoLoadEntities: true }),
    UserModule,
    HealthCheckModule,
    AutenticationModule,
    TimeModule,
  ],
})
export class AppModule {}
