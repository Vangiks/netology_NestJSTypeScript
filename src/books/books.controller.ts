import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  UsePipes,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { ICreateBook, IUpdateBook } from './dto';
import { IDocumentBook } from './model';
import { BookValidationPipe } from './validation';
import { bookSchema } from './validation/schema';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async getBooks(): Promise<Array<IDocumentBook>> {
    const books = await this.booksService.getBooks();
    if (!books) {
      throw new NotFoundException('Book not found');
    }
    return books;
  }

  @Get(':id')
  async getBook(@Param('id') id: string): Promise<IDocumentBook> {
    const book = await this.booksService.getBook(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  @UsePipes(new BookValidationPipe(bookSchema))
  @Post()
  async createBook(@Body() book: ICreateBook): Promise<IDocumentBook> {
    const result = await this.booksService.createBook(book);
    if (result) {
      return result;
    } else {
      throw new InternalServerErrorException('Book not found');
    }
  }

  @UsePipes(new BookValidationPipe(bookSchema))
  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() book: IUpdateBook,
  ): Promise<IDocumentBook> {
    let updateBook = await this.booksService.updateBook(id, book);
    if (updateBook) {
      return updateBook;
    } else {
      throw new InternalServerErrorException('Unable update book');
    }
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<boolean> {
    const book = await this.booksService.getBook(id);
    if (book) {
      const result = await this.booksService.deleteBook(id);

      if (result) {
        return true;
      } else {
        throw new InternalServerErrorException('Unable update book');
      }
    } else {
      throw new NotFoundException('Book not found');
    }
  }
}
