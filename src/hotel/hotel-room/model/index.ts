import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Schemas } from 'mongoose';
import { TID } from 'src/common';
import { Hotel } from '../../model';
import { IHotelRoom } from '../hotel-room.interface';

@Schema()
export class HotelRoom extends Document implements IHotelRoom {
  @Prop({ required: true, type: Schemas.Types.ObjectId, ref: Hotel.name })
  public hotel: TID;

  @Prop({ required: true })
  public description: string;

  @Prop({ default: [] })
  public images?: Array<string>;

  @Prop({ required: true })
  public createdAt: Date;

  @Prop({ required: true })
  public updatedAt: Date;

  @Prop({ required: true, default: true })
  public isEnabled: boolean;
}

export const HotelRoomModel = SchemaFactory.createForClass(HotelRoom);
