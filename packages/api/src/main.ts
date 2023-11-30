import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {CustomValidationPipe} from '@/@pipes/validation.pipe';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new CustomValidationPipe());

  const options = new DocumentBuilder()
      .setTitle('Google Drive Clone')
      .setDescription('API documentation for the Google Drive Clone')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document);


  app.enableCors();

  await app.listen(3000);
}

bootstrap();
