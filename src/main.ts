import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import {
  ResponseExceptionFilter,
  ResponseInterceptor,
  GLOBAL_PREFIX,
} from 'src/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new ResponseExceptionFilter());
  app.use(cookieParser());
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  if (port) {
    await app.listen(port);
  }
}
bootstrap();
