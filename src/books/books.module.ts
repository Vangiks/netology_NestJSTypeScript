import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BookModel, Book } from './model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookModel }]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
