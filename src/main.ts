import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { LeaveTypeSeeder } from './leave-type/leave-type.seeder';

async function bootstrap() {
  // Load environment variables
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  // Enable global validation pipes
  app.useGlobalPipes(new ValidationPipe());

  // Enable API versioning
  app.enableVersioning({
    type: VersioningType.URI, // Use URI versioning (e.g., /v1/resource)
    defaultVersion: '1', // Default version if no version is specified
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Leave Management API')
    .setDescription('API docs for Leave Management System')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'accessToken',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  // Run the seeder
  const leaveTypeSeeder = app.get(LeaveTypeSeeder);
  await leaveTypeSeeder.seed();

  // Start the application
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();