import {
  Controller,
  Get,
  Post,
  Param,
  Res,
  HttpStatus,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { IBooksResponse } from './interfaces';
import { ICreateBook, IUpdateBook } from './dto';
import { IDocumentBook } from './model';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}
  @Get()
  async getBooks(
    @Res({ passthrough: true }) response: IBooksResponse,
  ): Promise<Array<IDocumentBook> | string> {
    const books = await this.booksService.getBooks();
    if (!books) {
      response.status(HttpStatus.NOT_FOUND);
      return 'Books not found';
    }
    response.status(HttpStatus.OK);
    return books;
  }

  @Post()
  async createBook(
    @Body() book: ICreateBook,
    @Res({ passthrough: true }) response: IBooksResponse,
  ): Promise<IDocumentBook | string> {
    if (book) {
      const result = await this.booksService.createBook(book);
      if (result) {
        response.status(HttpStatus.CREATED);
        return result;
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR);
        return 'Unable create book';
      }
    } else {
      response.status(HttpStatus.BAD_REQUEST);
      return 'Bad request';
    }
  }

  @Get(':id')
  async getBook(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: IBooksResponse,
  ): Promise<IDocumentBook | string> {
    const book = await this.booksService.getBook(id);
    if (!book) {
      response.status(HttpStatus.NOT_FOUND);
      return 'Book not found';
    }
    response.status(HttpStatus.OK);
    return book;
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() book: IUpdateBook,
    @Res({ passthrough: true }) response: IBooksResponse,
  ): Promise<IDocumentBook | string> {
    let updateBook = await this.booksService.updateBook(id, book);
    if (updateBook) {
      response.status(HttpStatus.OK);
      return updateBook;
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return 'Unable update book';
    }
  }

  @Delete(':id')
  async deleteBook(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: IBooksResponse,
  ): Promise<boolean | string> {
    const book = await this.booksService.getBook(id);
    if (book) {
      const result = await this.booksService.deleteBook(id);

      if (result) {
        response.status(HttpStatus.OK);
        return true;
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR);
        return 'Unable delete book';
      }
    } else {
      response.status(HttpStatus.NOT_FOUND);
      return 'Book not found';
    }
  }
}
