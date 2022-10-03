import 'reflect-metadata';
import { injectable, inject } from 'inversify';

import Books, { TDocumentBook } from './model';
import { IBook } from './dto';
import config from '../../config';

import { ICounter } from '../../services/counter';
import { ETypeService } from '../types';

@injectable()
class BooksService {
  databasePath: string;
  private _counter: ICounter;

  constructor(@inject(ETypeService.Counter) counter: ICounter) {
    this.databasePath = config.DATABASE_PATH;
    this._counter = counter;
  }

  async getBooks(
    id: string,
    options = { increase: false }
  ): Promise<Array<TDocumentBook> | TDocumentBook | null> {
    try {
      if (id) {
        const book: TDocumentBook = await this.getBook(id, options);
        return book;
      } else {
        const books: Array<TDocumentBook> = await Books.find().select('-__v');
        return books;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async getBook(
    id: string,
    options = { increase: false }
  ): Promise<TDocumentBook | null> {
    try {
      const book: TDocumentBook = await Books.findById(id).select('-__v');
      if (!book) return null;
      let counter = 0;
      if (options.increase) {
        counter = await this._counter.icreaseCounter(book.id);
      }
      counter = await this._counter.getCounter(book.id);

      book.counter = counter;
      return book;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async createBook(book: IBook): Promise<TDocumentBook | null> {
    try {
      return await new Books(book).save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async updateBook(id: string, book: IBook): Promise<TDocumentBook | null> {
    try {
      return await Books.findByIdAndUpdate(id, book, { new: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async deleteBook(id: string) {
    try {
      const filter = { _id: id };
      const result = await Books.deleteOne(filter);
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return false;
    }
  }
}

export default BooksService;
