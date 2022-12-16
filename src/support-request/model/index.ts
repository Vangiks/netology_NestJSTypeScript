import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, ObjectId } from 'mongoose';
import { ISupportRequest, IMessage } from '../types';

export interface IDocumentSupportRequest extends Document, SupportRequest {}
export type SupportRequestDocument = HydratedDocument<SupportRequest>;

export interface IDocumentMessage extends Document, Message {}
export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class SupportRequest implements Omit<ISupportRequest, 'messages'> {
  @Prop({ required: true })
  public user: ObjectId;

  @Prop({ required: true })
  public createdAt: Date;

  @Prop()
  public messages: { type: ObjectId; ref: 'SupportRequest' };

  @Prop()
  public isActive: boolean;
}

@Schema()
export class Message implements IMessage {
  @Prop({ required: true })
  public author: ObjectId;

  @Prop({ required: true })
  public sentAt: Date;

  @Prop({ required: true })
  public text: string;

  @Prop()
  public readAt: Date;
}

export const SupportRequestModel = SchemaFactory.createForClass(SupportRequest);
export const MessageModel = SchemaFactory.createForClass(Message);
