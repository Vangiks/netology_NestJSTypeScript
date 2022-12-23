import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Schemas } from 'mongoose';
import { TID } from 'src/common';
import { User } from 'src/users/model';
import { IMessage } from '../message.interface';
import { ISupportRequest } from '../support-request.interface';

@Schema()
export class Message extends Document implements IMessage {
  @Prop({ required: true, type: Schemas.Types.ObjectId, ref: User.name })
  public author: TID;

  @Prop({ required: true })
  public sentAt: Date;

  @Prop({ required: true })
  public text: string;

  @Prop()
  public readAt?: Date;
}

@Schema()
export class SupportRequest extends Document implements ISupportRequest {
  @Prop({ required: true, type: Schemas.Types.ObjectId, ref: User.name })
  public user: TID;

  @Prop({ required: true })
  public createdAt: Date;

  @Prop({ type: Schemas.Types.Array, ref: Message.name, default: [] })
  public messages?: Array<TID>;

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
