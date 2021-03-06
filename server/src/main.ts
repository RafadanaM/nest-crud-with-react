import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:3000', 'http://192.168.0.30:3000'],
      credentials: true,

      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
  });
  app.use(cookieParser());

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
