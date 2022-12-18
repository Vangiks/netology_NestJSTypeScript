import { Hotel } from '../model';

export interface ISearchHotelParams extends Pick<Hotel, 'title'> {
  limit: number;
  offset: number;
}

export interface ICreateHotel extends Pick<Hotel, 'title' | 'description'> {}

export interface IUpdateHotel extends Pick<Hotel, 'title' | 'description'> {}
