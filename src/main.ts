import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
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

  const reflector = app.get(Reflector); //! Buscar que es esto
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  await app.listen(PORT);

  Logger.log(
    `Application running on: ${await app.getUrl()}`,
    'NestApplication',
  );
}
bootstrap();
