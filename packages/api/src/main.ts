import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {CustomValidationPipe} from '@/@pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new CustomValidationPipe());

  app.enableCors();

  await app.listen(3000);
}

bootstrap();
