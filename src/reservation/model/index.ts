import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as Schemas } from 'mongoose';

export interface IDocumentReservation extends Document, Reservation {}
export type ReservationDocument = HydratedDocument<Reservation>;

@Schema()
export class Reservation {
  @Prop({ required: true, type: Schemas.Types.ObjectId })
  public userId: string;

  @Prop({ required: true, type: Schemas.Types.ObjectId })
  public hotelId: string;

  @Prop({ required: true, type: Schemas.Types.ObjectId })
  public roomId: string;

  @Prop({ required: true })
  public dateStart: Date;

  @Prop({ required: true })
  public dateEnd: Date;
}

export const ReservationModel = SchemaFactory.createForClass(Reservation);
