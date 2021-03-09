import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(AppModule.port, '0.0.0.0');
  logger.log(`Application listening on port ${AppModule.port}`);
}
bootstrap();
