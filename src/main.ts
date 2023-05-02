import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  const PORT = app.get(ConfigService).get('PORT') || 3000;

  app.use(morgan('dev'));
  app.enableCors();
  await app.listen(PORT);

  Logger.log(
    `Application running on: ${await app.getUrl()}`,
    'NestApplication',
  );
}
bootstrap();
