import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Schemas } from 'mongoose';
import { HotelRoom } from 'src/hotel/hotel-room/model';
import { Hotel } from 'src/hotel/model';
import { User } from 'src/users/model';
import { IReservation } from '../reservation.interface';

@Schema()
export class Reservation
  extends Document
  implements Omit<IReservation, 'userId' | 'hotelId' | 'roomId'>
{
  @Prop({ required: true, type: Schemas.Types.ObjectId })
  public userId: User;

  @Prop({ required: true, type: Schemas.Types.ObjectId, ref: Hotel.name })
  public hotelId: Hotel;

  @Prop({ required: true, type: Schemas.Types.ObjectId, ref: HotelRoom.name })
  public roomId: HotelRoom;

  @Prop({ required: true })
  public dateStart: Date;

  @Prop({ required: true })
  public dateEnd: Date;
}

const ReservationModel = SchemaFactory.createForClass(Reservation);

export { ReservationModel };
