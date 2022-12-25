import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions } from 'mongoose';
import { IPagination, TID } from 'src/common';
import { Hotel } from './model';
import { IHotel } from './hotel.interface';
import { ICreateHotel, ISearchHotelParams, IUpdateHotel } from './dto';

@Injectable()
export class HotelService {
  constructor(@InjectModel(Hotel.name) private HotelModel: Model<Hotel>) {}

  async create(data: ICreateHotel): Promise<Hotel> {
    const hotel: IHotel = {
      title: data.title,
      description: data.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const newHotel: Hotel = new this.HotelModel(hotel);
    return newHotel.save();
  }

  async findById(id: TID): Promise<Hotel> {
    return this.HotelModel.findById(id).select('-__v');
  }

  async search(
    filters: ISearchHotelParams,
    select: string = '-__v',
    pagination: IPagination,
  ): Promise<Array<Hotel>> {
    const filter = {
      title: { $regex: !filters.title ? '' : filters.title },
    };
    return this.HotelModel.find(filter)
      .select('-__v' + select ? ' ' + select : '')
      .skip(pagination.offset)
      .limit(pagination.limit);
  }

  async update(
    id: TID,
    data: IUpdateHotel,
    options: QueryOptions = { new: false },
  ): Promise<Hotel> {
    const updateHotel = {
      title: data.title,
      description: data.description,
      updatedAt: new Date(),
    };
    return this.HotelModel.findByIdAndUpdate(id, updateHotel, options);
  }
}
