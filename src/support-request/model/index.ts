import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as Schemas } from 'mongoose';

export interface IDocumentSupportRequest extends Document, SupportRequest {}
export type SupportRequestDocument = HydratedDocument<SupportRequest>;

export interface IDocumentMessage extends Document, Message {}
export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ required: true, type: Schemas.Types.ObjectId })
  public author: string;

  @Prop({ required: true })
  public sentAt: Date;

  @Prop({ required: true })
  public text: string;

  @Prop()
  public readAt: Date;
}

@Schema()
export class SupportRequest {
  @Prop({ required: true, type: Schemas.Types.ObjectId })
  public user: string;

  @Prop({ required: true })
  public createdAt: Date;

  @Prop({ type: Schemas.Types.ObjectId, ref: Message.name })
  public messages: string;

  @Prop()
  public isActive: boolean;
}

export const SupportRequestModel = SchemaFactory.createForClass(SupportRequest);
export const MessageModel = SchemaFactory.createForClass(Message);
