import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, ObjectId } from 'mongoose';

export interface IDocumentHotelRoom extends Document, HotelRoom {}
export type HotelRoomDocument = HydratedDocument<HotelRoom>;

@Schema()
export class HotelRoom {
  @Prop({ required: true })
  public hotel: { type: ObjectId; ref: 'Hotel' };

  @Prop({ required: true })
  public description: string;

  @Prop({ default: [] })
  public images: Array<string>;

  @Prop({ required: true })
  public createdAt: Date;

  @Prop({ required: true })
  public updatedAt: Date;

  @Prop({ required: true, default: true })
  public isEnabled: boolean;
}

export const HotelRoomModel = SchemaFactory.createForClass(HotelRoom);
