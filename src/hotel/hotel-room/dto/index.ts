import { IHotelRoom } from '../hotel-room.interface';

export interface ICreateHotelRoom
  extends Pick<IHotelRoom, 'images' | 'description'> {
  hotelId: string;
}

export interface IUpdateHotelRoom
  extends Partial<Pick<IHotelRoom, 'images' | 'description' | 'isEnabled'>> {
  hotelId: string;
}

export interface ISearchHotelRoomsParams extends Pick<IHotelRoom, 'hotel'> {
  limit: number;
  offset: number;
  isEnabled?: boolean;
}
