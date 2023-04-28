import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import helmet from 'helmet';

import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  app.enableCors({ credentials: true, origin: true });
  app.use(cookieParser());
  app.use(helmet());

  const config = new DocumentBuilder().setTitle('Time Tracker').setVersion('1.0').build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.APP_PORT);
  logger.log(`Application is running on: ${await app.getUrl()} - Port: ${process.env.APP_PORT}`);
}
bootstrap();
