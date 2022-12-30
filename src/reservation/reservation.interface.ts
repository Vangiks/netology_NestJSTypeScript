import { TID } from 'src/common';
import { IReservationDto, IReservationSearchOptions } from './dto';

export interface IReservation {
  userId: TID;
  hotelId: TID;
  roomId: TID;
  dateStart: Date;
  dateEnd: Date;
}

export interface ICreateReservation extends Omit<IReservation, 'hotelId'> {}

export interface IReservationService {
  addReservation(data: ICreateReservation): Promise<IReservationDto>;
  removeReservation(id: TID, userId?: string): Promise<void>;
  getReservations(
    filter: IReservationSearchOptions,
  ): Promise<Array<IReservationDto>>;
}
