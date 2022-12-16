import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ResponseInterceptor } from '../interceptors/response';
import { ResponseExceptionFilter } from '../exceptions-filters/response';
// import { MongoExceptionFilter } from '../exceptions-filters/mongo';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new ResponseExceptionFilter());
  // app.useGlobalFilters(new MongoExceptionFilter());
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  if (port) {
    await app.listen(port);
  }
}
bootstrap();
