import { TID } from 'src/common';
import { Reservation } from '../model';

export interface ICreateReservation {
  hotelRoom: string;
  startDate: string;
  endDate: string;
}

export interface IReservationSearchOptions
  extends Partial<Omit<Reservation, 'hotelId' | 'roomId'>> {
  _id?: TID;
  userId?: string;
  dateStart?: Date;
  dateEnd?: Date;
}
