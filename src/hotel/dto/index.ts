import { IHotel } from '../hotel.interface';

export interface ISearchHotelParams extends Pick<IHotel, 'title'> {
  limit: number;
  offset: number;
}

export interface ICreateHotel extends Pick<IHotel, 'title' | 'description'> {}

export interface IUpdateHotel extends Pick<IHotel, 'title' | 'description'> {}
