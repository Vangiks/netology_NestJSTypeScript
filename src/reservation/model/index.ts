import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, ObjectId } from 'mongoose';
import { IReservation } from '../types';

export interface IDocumentReservation extends Document, Reservation {}
export type ReservationDocument = HydratedDocument<Reservation>;

@Schema()
export class Reservation implements IReservation {
  @Prop({ required: true })
  public userId: ObjectId;

  @Prop({ required: true })
  public hotelId: ObjectId;

  @Prop({ required: true })
  public roomId: ObjectId;

  @Prop({ required: true })
  public dateStart: Date;

  @Prop({ required: true })
  public dateEnd: Date;
}

export const ReservationModel = SchemaFactory.createForClass(Reservation);
