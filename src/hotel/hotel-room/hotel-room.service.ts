import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TID } from 'src/types';
import { HotelRoom, IDocumentHotelRoom } from './model';
import { IHotelRoom, ISearchRoomsParams } from './types';

@Injectable()
export class HotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private HotelRoomModel: Model<IDocumentHotelRoom>,
  ) {}

  async create(data: Partial<IHotelRoom>): Promise<IDocumentHotelRoom | null> {
    try {
      const newHotelRoom: IDocumentHotelRoom = new this.HotelRoomModel(data);
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
    params: ISearchRoomsParams,
  ): Promise<Array<IDocumentHotelRoom> | null> {
    try {
      const filter: Pick<ISearchRoomsParams, 'hotel' | 'isEnabled'> = {
        hotel: params.hotel,
      };
      if (params.isEnabled) {
        filter.isEnabled = params.isEnabled;
      }
      return this.HotelRoomModel.find(filter)
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
    data: Partial<IHotelRoom>,
  ): Promise<IDocumentHotelRoom | null> {
    try {
      return this.HotelRoomModel.findByIdAndUpdate(id, data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }
}
