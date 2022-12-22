import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions } from 'mongoose';
import { TID } from 'src/common';
import { HotelRoom, IDocumentHotelRoom } from './model';
import {
  ICreateHotelRoom,
  IUpdateHotelRoom,
  ISearchHotelRoomsParams,
} from './dto';

@Injectable()
export class HotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private HotelRoomModel: Model<IDocumentHotelRoom>,
  ) {}

  async create(data: ICreateHotelRoom): Promise<IDocumentHotelRoom | null> {
    try {
      const hotelRoom: HotelRoom = {
        hotel: data.hotelId,
        description: data.description,
        images: data.images,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const newHotelRoom: IDocumentHotelRoom = new this.HotelRoomModel(
        hotelRoom,
      );
      return newHotelRoom.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async findById(id: TID): Promise<IDocumentHotelRoom | null> {
    try {
      return this.HotelRoomModel.findById(id).select('-__v');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async search(
    params: ISearchHotelRoomsParams,
    select?: string,
  ): Promise<Array<IDocumentHotelRoom> | null> {
    try {
      if (params.isEnabled) {
        params.isEnabled = params.isEnabled;
      }
      const selectedHotelRoom = this.HotelRoomModel.find(params).select('-__v');

      return selectedHotelRoom
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
    data: IUpdateHotelRoom,
    options: QueryOptions = { new: false },
  ): Promise<IDocumentHotelRoom | null> {
    try {
      return this.HotelRoomModel.findByIdAndUpdate(
        id,
        { ...data, updatedAt: new Date() },
        options,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }
}
