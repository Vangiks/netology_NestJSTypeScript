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
// ReservationModel.method('toJSON', function () {
//   const { __v, _id, hotelId, roomId, dateStart, dateEnd, ...object } =
//     this.toObject();
//   let _object = object;
//   if (_id) {
//     _object = { id: _id, ..._object };
//   }
//   if (hotelId) {
//     _object = { ..._object, hotel: hotelId };
//   }
//   if (roomId) {
//     _object = { ..._object, hotelRoom: roomId };
//   }
//   if (dateStart) {
//     _object = { ..._object, startDate: dateStart };
//   }
//   if (dateEnd) {
//     _object = { ..._object, endDate: dateEnd };
//   }
//   if (__v) {
//     _object = { ..._object, __v };
//   }

//   return _object;
// });

export { ReservationModel };
