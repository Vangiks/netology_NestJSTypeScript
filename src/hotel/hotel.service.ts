import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TID } from 'src/types';
import { Hotel, IDocumentHotel } from './model';
import { ICreateHotel, ISearchHotelParams, IUpdateHotelParams } from './dto';

@Injectable()
export class HotelService {
  constructor(
    @InjectModel(Hotel.name) private HotelModel: Model<IDocumentHotel>,
  ) {}

  async create(data: ICreateHotel): Promise<IDocumentHotel | null> {
    try {
      const newHotel: IDocumentHotel = new this.HotelModel(data);
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
  ): Promise<Array<IDocumentHotel> | null> {
    try {
      const filter = {
        title: { $regex: params.title },
      };
      return this.HotelModel.find(filter)
        .select('-__v')
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
    data: IUpdateHotelParams,
  ): Promise<IDocumentHotel | null> {
    try {
      return this.HotelModel.findByIdAndUpdate(id, data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }
}
