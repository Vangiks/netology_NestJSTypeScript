import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export interface IDocumentBook extends Document {}

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ required: true })
  public title: string;

  @Prop({ required: true })
  public description: string;

  @Prop({ required: true })
  public authors: string;

  @Prop({ required: true })
  public favorite: boolean;

  @Prop({ default: '' })
  public fileCover: string;

  @Prop({ default: '' })
  public fileName: string;

  @Prop({ default: '' })
  public fileBook: string;

  @Prop({ default: 0 })
  public counter: number;
}

export const BookModel = SchemaFactory.createForClass(Book);
