import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }));

  app.useGlobalFilters(new HttpExceptionFilter());

  // Setting up Swagger document
  const options = new DocumentBuilder()
    .setTitle('Base Code')
    .setDescription('Base Code for Raised Real backends')
    .setVersion('1.0')
    .addApiKey({type:'apiKey', in: 'header', name: 'api-key'}, 'access-key')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}

bootstrap();
