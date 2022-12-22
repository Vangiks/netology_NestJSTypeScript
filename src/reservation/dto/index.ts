import { TID } from 'src/common';
import { IReservation } from '../reservation.interface';

export interface ICreateReservation {
  hotelRoom: string;
  startDate: string;
  endDate: string;
}

export interface IReservationSearchOptions
  extends Partial<Omit<IReservation, 'hotelId' | 'roomId'>> {
  userId?: string;
  dateStart?: Date;
  dateEnd?: Date;
}
