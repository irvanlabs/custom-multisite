import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import 'dotenv/config'
import { Logger, ValidationPipe } from '@nestjs/common';

const port = parseInt(process.env.APP_PORT);
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule, 
    new FastifyAdapter()
  );

  app.useGlobalPipes(new ValidationPipe());
  await app.listen({port:port});
  Logger.log('Starting app on port ' + port, 'General');
}
bootstrap();
