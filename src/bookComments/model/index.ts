import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookCommentDocument = HydratedDocument<BookComment>;

@Schema()
export class BookComment {
  @Prop({ required: true })
  public bookId: string;

  @Prop({ default: '' })
  public comment: string;
}

export const BookCommentModel = SchemaFactory.createForClass(BookComment);
