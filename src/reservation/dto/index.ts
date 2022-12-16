import { ObjectId } from 'mongoose';

import { Reservation } from '../model';

export interface ICreateReservation extends Reservation {}

export interface IReservationSearchOptions
  extends Omit<Reservation, 'hotelId' | 'roomId'> {
  userId: ObjectId;
  dateStart: Date;
  dateEnd: Date;
}
