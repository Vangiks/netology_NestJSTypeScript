import { Hotel } from '../model';

export interface ISearchHotelParams extends Pick<Hotel, 'title'> {
  limit: number;
  offset: number;
}

export interface ICreateHotel extends Partial<Hotel> {}

export interface IUpdateHotelParams
  extends Pick<Hotel, 'title' | 'description'> {}
