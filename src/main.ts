import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ResponseInterceptor } from '../interceptors/response';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  if (port) {
    await app.listen(port);
  }
}
bootstrap();
