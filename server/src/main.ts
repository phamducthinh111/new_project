import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  app.useGlobalPipes(new ValidationPipe());
  app.use(passport.initialize());
  await app.listen(3000);
}
bootstrap();
