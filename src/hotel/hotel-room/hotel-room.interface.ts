import { QueryOptions } from 'mongoose';
import { IPagination, TID } from 'src/common';
import {
  ICreateHotelRoom,
  ISearchHotelRoomsParams,
  IUpdateHotelRoom,
} from './dto';
import { HotelRoom } from './model';

export interface IHotelRoom {
  hotel: TID;
  description: string;
  images?: Array<string>;
  createdAt: Date;
  updatedAt: Date;
  isEnabled: boolean;
}

export interface ISearchHotelRoom
  extends Pick<IHotelRoom, 'description' | 'images'> {
  id: TID;
  hotel: {
    id: TID;
    title: string;
  };
}

export interface IHotelRoomService {
  create(data: ICreateHotelRoom): Promise<HotelRoom>;
  findById(id: TID): Promise<HotelRoom>;
  search(
    filters: ISearchHotelRoomsParams,
    select: string,
    pagination: IPagination,
  ): Promise<Array<ISearchHotelRoom>>;
  update(
    id: TID,
    data: IUpdateHotelRoom,
    options: QueryOptions,
  ): Promise<HotelRoom>;
}
