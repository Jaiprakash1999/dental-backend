import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'stream/consumers';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(bodyParser.json({ limit: '50mb' }));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('MMU Backend')
    .setDescription('API documentation for MMU Backend')
    .setVersion('1')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'bearerAuth', // Key to identify this auth type
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Swagger UI setup
  SwaggerModule.setup('/api', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Retain the token in Swagger's "Authorize" dialog
    },
  });
  app.enableCors();

  await app.listen(8080);
  console.log('Application Listening on port', 8080);
}
bootstrap();
