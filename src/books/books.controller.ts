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

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}
  @Get()
  async getBooks(@Res() response: IBooksResponse): Promise<IBooksResponse> {
    const books = await this.booksService.getBooks();
    if (!books) {
      return response.status(HttpStatus.NOT_FOUND).send({
        errors: ['Books not found'],
        response: null,
        status: true,
      });
    }
    return response.status(HttpStatus.OK).send({
      errors: [],
      response: books,
      status: true,
    });
  }

  @Post()
  async createBook(
    @Body() book: ICreateBook,
    @Res() response: IBooksResponse,
  ): Promise<IBooksResponse> {
    if (book) {
      const result = await this.booksService.createBook(book);
      if (result)
        return response
          .status(HttpStatus.CREATED)
          .send({ errors: [], response: result, status: true });
      else
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          errors: ['Unable create book'],
          response: null,
          status: false,
        });
    } else
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send({ errors: ['Bad request'], response: null, status: false });
  }

  @Get(':id')
  async getBook(
    @Param('id') id: string,
    @Res() response: IBooksResponse,
  ): Promise<IBooksResponse> {
    const books = await this.booksService.getBook(id);
    if (!books) {
      return response.status(HttpStatus.NOT_FOUND).send({
        errors: ['Book not found'],
        response: null,
        status: true,
      });
    }
    return response.status(HttpStatus.OK).send({
      errors: [],
      response: books,
      status: true,
    });
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() book: IUpdateBook,
    @Res() response: IBooksResponse,
  ): Promise<IBooksResponse> {
    let updateBook = await this.booksService.updateBook(id, book);
    if (updateBook)
      return response
        .status(HttpStatus.OK)
        .send({ errors: [], response: updateBook, status: true });
    else
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        errors: ['Unable update book'],
        response: null,
        status: false,
      });
  }

  @Delete(':id')
  async deleteBook(
    @Param('id') id: string,
    @Res() response: IBooksResponse,
  ): Promise<IBooksResponse> {
    const book = await this.booksService.getBook(id);
    if (book) {
      const result = await this.booksService.deleteBook(id);

      if (result)
        return response
          .status(HttpStatus.OK)
          .send({ errors: [], response: null, status: true });
      else
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          errors: ['Unable delete book'],
          response: null,
          status: false,
        });
    } else
      return response
        .status(HttpStatus.NOT_FOUND)
        .send({ errors: ['Book not found'], response: null, status: false });
  }
}
