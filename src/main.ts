import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { Logger, ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  const PORT = app.get(ConfigService).get('PORT') || 3000;

  app.use(morgan('dev'));
  app.enableCors();

  // Agregamos un pipe que será utilizado en todo el proyecto
  // ValidationPipe ->se utiliza para validar los datos de entrada de una solicitud utilizando las validaciones definidas en las clases DTO
  // enableImplicitConversion -> habilita la conversión automática de tipos de datos en los DTO, es decir, si entra un string y espero un numero, intentará transformarlo
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(PORT);

  Logger.log(
    `Application running on: ${await app.getUrl()}`,
    'NestApplication',
  );
}
bootstrap();
