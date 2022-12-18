import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions } from 'mongoose';
import { TID } from 'src/types';
import { Hotel, IDocumentHotel } from './model';
import { ICreateHotel, ISearchHotelParams, IUpdateHotel } from './dto';

@Injectable()
export class HotelService {
  constructor(
    @InjectModel(Hotel.name) private HotelModel: Model<IDocumentHotel>,
  ) {}

  async create(data: ICreateHotel): Promise<IDocumentHotel | null> {
    try {
      const hotel: Hotel = {
        title: data.title,
        description: data.description,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const newHotel: IDocumentHotel = new this.HotelModel(hotel);
      return newHotel.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async findById(id: TID): Promise<IDocumentHotel | null> {
    try {
      return this.HotelModel.findById(id).select('-__v');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async search(
    params: ISearchHotelParams,
    select?: string,
  ): Promise<Array<IDocumentHotel> | null> {
    try {
      const filter = {
        title: { $regex: params.title },
      };
      return this.HotelModel.find(filter)
        .select('-__v' + select ? ' ' + select : '')
        .skip(params.offset)
        .limit(params.limit);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async update(
    id: TID,
    data: IUpdateHotel,
    options: QueryOptions = { new: false },
  ): Promise<IDocumentHotel | null> {
    try {
      const updateHotel = {
        title: data.title,
        description: data.description,
        updatedAt: new Date(),
      };
      return this.HotelModel.findByIdAndUpdate(id, updateHotel, options);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }
}
