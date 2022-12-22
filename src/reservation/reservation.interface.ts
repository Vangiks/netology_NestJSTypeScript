import { TID } from 'src/common';

export interface IReservation {
  userId: TID;
  hotelId: TID;
  roomId: TID;
  dateStart: Date;
  dateEnd: Date;
}
