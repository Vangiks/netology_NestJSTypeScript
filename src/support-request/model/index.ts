import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as Schemas } from 'mongoose';
import { User, IDocumentUser } from 'src/users/model';

export interface IDocumentSupportRequest extends Document, SupportRequest {}
export type SupportRequestDocument = HydratedDocument<SupportRequest>;

export interface IDocumentMessage extends Document, Message {}
export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ required: true, type: Schemas.Types.ObjectId, ref: User.name })
  public author: IDocumentUser;

  @Prop({ required: true })
  public sentAt: Date;

  @Prop({ required: true })
  public text: string;

  @Prop()
  public readAt?: Date;
}

@Schema()
export class SupportRequest {
  @Prop({ required: true, type: Schemas.Types.ObjectId, ref: User.name })
  public user: IDocumentUser;

  @Prop({ required: true })
  public createdAt: Date;

  @Prop({ type: Schemas.Types.Array, ref: Message.name, default: [] })
  public messages?: Array<IDocumentMessage>;

  @Prop()
  public isActive?: boolean;
}

const SupportRequestModel = SchemaFactory.createForClass(SupportRequest);
SupportRequestModel.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  let _object = object;
  if (_id) {
    _object = { id: _id, ..._object };
  }
  if (__v) {
    _object = { id: _id, ..._object, __v };
  }
  return _object;
});

export { SupportRequestModel };
export const MessageModel = SchemaFactory.createForClass(Message);
