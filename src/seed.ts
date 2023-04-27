import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { Seeder } from '@shared/infra/typeorm/seeder/seed';
import { SeederModule } from '@shared/infra/typeorm/seeder/seeder.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeederModule);

  const logger = appContext.get(Logger);
  const seeder = appContext.get(Seeder);

  try {
    await seeder.seed();

    logger.debug('Seeding Completed');
  } catch (error) {
    logger.error('Seeding failed');

    throw error;
  } finally {
    appContext.close();
  }
}

bootstrap();
