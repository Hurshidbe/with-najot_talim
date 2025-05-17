import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const API = process.env.API;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  console.log(process.env.JWT);
  console.log('JWT secret:', process.env.JWT); // <-- bu chiqishi kerak!

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
