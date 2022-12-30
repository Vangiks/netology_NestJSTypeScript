import { QueryOptions } from 'mongoose';
import { IPagination, TID } from 'src/common';
import { ICreateHotel, ISearchHotelParams, IUpdateHotel } from './dto';
import { Hotel } from './model';

export interface IHotel {
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IHotelService {
  create(data: ICreateHotel): Promise<Hotel>;
  findById(id: TID): Promise<Hotel>;
  search(
    filters: ISearchHotelParams,
    select: string,
    pagination: IPagination,
  ): Promise<Array<Hotel>>;
  update(id: TID, data: IUpdateHotel, options: QueryOptions): Promise<Hotel>;
}
