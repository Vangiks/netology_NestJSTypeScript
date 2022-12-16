import { TID } from 'src/types';

export interface IReservation {
  userId: TID;
  hotelId: TID;
  roomId: TID;
  dateStart: Date;
  dateEnd: Date;
}

export interface IReservationSearchOptions
  extends Omit<IReservation, 'hotelId' | 'roomId'> {
  userId: TID;
  dateStart: Date;
  dateEnd: Date;
}
