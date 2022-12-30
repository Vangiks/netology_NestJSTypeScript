import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions } from 'mongoose';
import { IPagination, TID } from 'src/common';
import { HotelRoom } from './model';
import {
  ICreateHotelRoom,
  IUpdateHotelRoom,
  ISearchHotelRoomsParams,
} from './dto';
import {
  IHotelRoom,
  IHotelRoomService,
  ISearchHotelRoom,
} from './hotel-room.interface';
import { Hotel } from '../model';
import { HotelService } from '../hotel.service';

@Injectable()
export class HotelRoomService implements IHotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private HotelRoomModel: Model<HotelRoom>,
    private hotelService: HotelService,
  ) {}

  async create(data: ICreateHotelRoom): Promise<HotelRoom> {
    const hotel = await this.hotelService.findById(data.hotelId);
    if (!hotel) {
      throw new BadRequestException('Отеля с таким номером не существует');
    }

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
    filters: ISearchHotelRoomsParams,
    select: string = '-__v',
    pagination: IPagination,
  ): Promise<Array<ISearchHotelRoom>> {
    const noIsEnabled = ({ isEnabled, ...filters }: ISearchHotelRoomsParams) =>
      filters;
    if (!filters.isEnabled) {
      noIsEnabled(filters);
    }
    return this.HotelRoomModel.find(filters)
      .select(select)
      .populate<{ hotel: Hotel }>('hotel')
      .skip(pagination.offset)
      .limit(pagination.limit)
      .then((hotelRooms) => {
        return hotelRooms.map((hotelRoom) => ({
          id: hotelRoom._id,
          description: hotelRoom.description,
          images: hotelRoom.images,
          hotel: {
            id: hotelRoom.hotel._id,
            title: hotelRoom.hotel.title,
          },
        }));
      });
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
