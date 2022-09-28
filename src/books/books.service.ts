import Books, { TDocumentBook } from './model';
import { IBook } from './interfaces';
import config from '../../config';

import { CounterBook, ICounter } from '../../services/counter';

interface BooksServiceProps {
  counterBook: ICounter;
}

class BooksService implements BooksServiceProps {
  databasePath: string;
  counterBook: ICounter;

  constructor({ counterBook }: BooksServiceProps) {
    this.databasePath = config.DATABASE_PATH;
    this.counterBook = counterBook;
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
        counter = await this.counterBook.icreaseCounter(book.id);
      }
      counter = await this.counterBook.getCounter(book.id);

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

module.exports = new BooksService({ counterBook: new CounterBook() });
