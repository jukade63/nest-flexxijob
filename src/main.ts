import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'],
  });
  app.use(express.json({ limit: '50mb' }));
  const port = app.get(ConfigService).getOrThrow('SERVER_PORT')
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(port || 4000, () => console.log(`server started on port ${port}`));
  
}
bootstrap();
