import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Schemas } from 'mongoose';
import { TID } from 'src/common';
import { HotelRoom } from 'src/hotel/hotel-room/model';
import { Hotel } from 'src/hotel/model';
import { User } from 'src/users/model';
import { IReservation } from '../reservation.interface';

@Schema()
export class Reservation extends Document implements IReservation {
  @Prop({ required: true, type: Schemas.Types.ObjectId, ref: User.name })
  public userId: TID;

  @Prop({ required: true, type: Schemas.Types.ObjectId, ref: Hotel.name })
  public hotelId: TID;

  @Prop({ required: true, type: Schemas.Types.ObjectId, ref: HotelRoom.name })
  public roomId: TID;

  @Prop({ required: true })
  public dateStart: Date;

  @Prop({ required: true })
  public dateEnd: Date;
}

const ReservationModel = SchemaFactory.createForClass(Reservation);

export { ReservationModel };
