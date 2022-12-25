import { IReservation } from '../reservation.interface';
import { IHotel } from 'src/hotel/hotel.interface';
import { IHotelRoom } from 'src/hotel/hotel-room/hotel-room.interface';
import { TID } from 'src/common';

export interface IReservationDto {
  startDate: Date;
  endDate: Date;
  hotelRoom: Pick<IHotelRoom, 'description' | 'images'>;
  hotel: Pick<IHotel, 'title' | 'description'>;
}

export interface ICreateReservationDto
  extends Pick<IReservationDto, 'startDate' | 'endDate'> {
  hotelRoom: TID;
}

export interface IReservationSearchOptions
  extends Partial<Omit<IReservation, 'hotelId' | 'roomId'>> {
  userId?: string;
  dateStart?: Date;
  dateEnd?: Date;
}
