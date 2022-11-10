import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    BooksModule,
    UsersModule,
    MongooseModule.forRoot(process.env.DATABASE_PATH),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
