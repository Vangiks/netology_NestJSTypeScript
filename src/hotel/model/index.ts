import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, ObjectId } from 'mongoose';
import { IHotel } from '../types';

export interface IDocumentHotel extends Document, Hotel {}
export type HotelDocument = HydratedDocument<Hotel>;

@Schema()
export class Hotel implements IHotel {
  @Prop({ required: true })
  public title: ObjectId;

  @Prop()
  public description: string;

  @Prop({ required: true })
  public createdAt: Date;

  @Prop({ required: true })
  public updatedAt: Date;
}

export const HotelModel = SchemaFactory.createForClass(Hotel);
