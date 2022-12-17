import { Reservation } from '../model';

export interface ICreateReservation extends Reservation {}

export interface IReservationSearchOptions
  extends Omit<Reservation, 'hotelId' | 'roomId'> {
  userId: string;
  dateStart: Date;
  dateEnd: Date;
}
