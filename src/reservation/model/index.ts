import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as Schemas } from 'mongoose';
import { HotelRoom } from 'src/hotel/hotel-room/model';
import { Hotel } from 'src/hotel/model';

export interface IDocumentReservation extends Document, Reservation {}
export type ReservationDocument = HydratedDocument<Reservation>;

@Schema()
export class Reservation {
  @Prop({ required: true, type: Schemas.Types.ObjectId })
  public userId: string;

  @Prop({ required: true, type: Schemas.Types.ObjectId, ref: Hotel.name })
  public hotelId: string;

  @Prop({ required: true, type: Schemas.Types.ObjectId, ref: HotelRoom.name })
  public roomId: string;

  @Prop({ required: true })
  public dateStart: Date;

  @Prop({ required: true })
  public dateEnd: Date;
}

const ReservationModel = SchemaFactory.createForClass(Reservation);

export { ReservationModel };
