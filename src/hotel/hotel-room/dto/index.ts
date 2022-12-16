import { HotelRoom } from '../model';

export interface ICreateHotelRoom extends Partial<HotelRoom> {}

export interface IUpdateHotelRoom extends Partial<HotelRoom> {}

export interface ISearchRoomsParams extends Pick<HotelRoom, 'hotel'> {
  limit: number;
  offset: number;
  isEnabled?: boolean;
}
