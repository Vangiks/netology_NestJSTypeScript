import { TID } from 'src/types';

export interface IHotel {
  title: TID;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISearchHotelParams extends Pick<IHotel, 'title'> {
  limit: number;
  offset: number;
}

export interface IUpdateHotelParams
  extends Pick<IHotel, 'title' | 'description'> {}
