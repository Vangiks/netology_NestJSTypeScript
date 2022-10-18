import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IDocumentBook } from './model';
import { ICreateBook, IUpdateBook } from './dto';

@Injectable()
export class BooksService {
  private books: Array<IDocumentBook> = [];

  async getBooks(): Promise<Array<IDocumentBook> | IDocumentBook | null> {
    try {
      const books: Array<IDocumentBook> = this.books;
      return books;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async getBook(
    id: string,
    options = { increase: false },
  ): Promise<IDocumentBook | null> {
    try {
      const book: IDocumentBook = this.books.find((book) => book.id === id);
      if (!book) return null;
      return book;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async createBook(book: ICreateBook): Promise<IDocumentBook | null> {
    try {
      const newBook: IDocumentBook = {
        id: uuidv4(),
        ...book,
        counter: 0,
        fileBook: '',
        fileCover: '',
        fileName: '',
      };
      this.books.push(newBook);
      return newBook;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async updateBook(
    id: string,
    book: IUpdateBook,
  ): Promise<IDocumentBook | null> {
    try {
      const index: number = this.books.findIndex((book) => book.id === id);
      if (index === -1) {
        throw new Error('Book not found');
      }
      const updateBook = { ...this.books[index], ...book };
      this.books[index] = updateBook;
      return updateBook;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async deleteBook(id: string) {
    try {
      this.books = this.books.filter((book) => book.id !== id);
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return false;
    }
  }
}
