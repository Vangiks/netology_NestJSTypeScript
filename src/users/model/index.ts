import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { ERole } from '../types';

export interface IDocumentUser extends Document, User {}

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: true })
  public passwordHash: string;

  @Prop({ required: true })
  public name: string;

  @Prop()
  public contactPhone?: string;

  @Prop({ required: true, default: ERole.Client })
  public role: ERole;
}

const UserModel = SchemaFactory.createForClass(User);

UserModel.method('toJSON', function () {
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

export { UserModel };
