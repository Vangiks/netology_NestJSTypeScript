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
  public contactPhone: string;

  @Prop({ required: true, default: ERole.Client })
  public role: ERole;
}

export const UserModel = SchemaFactory.createForClass(User);
