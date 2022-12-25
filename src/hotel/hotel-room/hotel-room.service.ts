import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions } from 'mongoose';
import { TID } from 'src/common';
import { HotelRoom } from './model';
import {
  ICreateHotelRoom,
  IUpdateHotelRoom,
  ISearchHotelRoomsParams,
} from './dto';
import { IHotelRoom } from './hotel-room.interface';

@Injectable()
export class HotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private HotelRoomModel: Model<HotelRoom>,
  ) {}

  async create(data: ICreateHotelRoom): Promise<HotelRoom> {
    const hotelRoom: IHotelRoom = {
      hotel: data.hotelId,
      description: data.description,
      images: data.images,
      isEnabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const newHotelRoom: HotelRoom = new this.HotelRoomModel(hotelRoom);
    return newHotelRoom.save();
  }

  async findById(id: TID): Promise<HotelRoom> {
    return this.HotelRoomModel.findById(id).select('-__v');
  }

  async search(
    params: ISearchHotelRoomsParams,
    select?: string,
  ): Promise<Array<HotelRoom>> {
    if (params.isEnabled) {
      params.isEnabled = params.isEnabled;
    }
    const selectedHotelRoom = this.HotelRoomModel.find(params).select('-__v');

    return selectedHotelRoom
      .select('-__v' + select ? ' ' + select : '')
      .skip(params.offset)
      .limit(params.limit);
  }

  async update(
    id: TID,
    data: IUpdateHotelRoom,
    options: QueryOptions = { new: false },
  ): Promise<HotelRoom> {
    return this.HotelRoomModel.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      options,
    );
  }
}
