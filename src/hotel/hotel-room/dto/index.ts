import { HotelRoom } from '../model';

export interface ICreateHotelRoom
  extends Pick<HotelRoom, 'images' | 'description'> {
  hotelId: string;
}

export interface IUpdateHotelRoom
  extends Partial<Pick<HotelRoom, 'images' | 'description' | 'isEnabled'>> {
  hotelId: string;
}

export interface ISearchHotelRoomsParams extends Pick<HotelRoom, 'hotel'> {
  limit: number;
  offset: number;
  isEnabled?: boolean;
}
