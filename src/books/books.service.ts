import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { IDocumentBook, Book } from './model';
import { ICreateBook, IUpdateBook } from './dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private BookModel: Model<IDocumentBook>,
    // @InjectConnection() private connection: Connection,
  ) {}

  async getBooks(): Promise<Array<IDocumentBook> | null> {
    try {
      return this.BookModel.find().exec();
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
      return this.BookModel.findById(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async createBook(book: ICreateBook): Promise<IDocumentBook | null> {
    try {
      const newBook = new this.BookModel(book);
      return newBook.save();
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
      return this.BookModel.findByIdAndUpdate(id, book);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async deleteBook(id: string) {
    try {
      return this.BookModel.deleteOne({ _id: id });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return false;
    }
  }
}
