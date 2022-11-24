import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookCommentDocument, BookComment } from './model';
import { ICreateBookComment, IUpdateBookComment } from './dto';

@Injectable()
export class BookCommentsService {
  constructor(
    @InjectModel(BookComment.name)
    private BookCommentModel: Model<BookCommentDocument>,
  ) {}

  async getComments(): Promise<Array<BookCommentDocument> | null> {
    try {
      return this.BookCommentModel.find().exec();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async findAllBookComment(
    bookId: string,
  ): Promise<Array<BookCommentDocument | null>> {
    try {
      return this.BookCommentModel.find({ bookId }).exec();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async getComment(id: string): Promise<BookCommentDocument | null> {
    try {
      return this.BookCommentModel.findById(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async createBookComment(
    book: ICreateBookComment,
  ): Promise<BookCommentDocument | null> {
    try {
      const newBookComment = new this.BookCommentModel(book);
      return newBookComment.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async updateBookComment(
    id: string,
    bookComment: IUpdateBookComment,
  ): Promise<BookCommentDocument | null> {
    try {
      return this.BookCommentModel.findByIdAndUpdate(id, bookComment);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async deleteBookComment(id: string) {
    try {
      return this.BookCommentModel.deleteOne({ _id: id });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return false;
    }
  }
}
