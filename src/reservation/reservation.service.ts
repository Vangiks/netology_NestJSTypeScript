import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IReservationSearchOptions } from './dto';
import { IDocumentReservation, Reservation } from './model';
import { TID } from 'src/common';
import { HotelRoomService } from 'src/hotel/hotel-room/hotel-room.service';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private ReservationModel: Model<IDocumentReservation>,
    private readonly hotelRoomService: HotelRoomService,
  ) {}

  async addReservation(data): Promise<IDocumentReservation> {
    const hotelRoom = await this.hotelRoomService.findById(data.roomId);
    if (!hotelRoom) {
      throw new BadRequestException('Нет такого номера');
    }

    if (!hotelRoom.isEnabled) {
      throw new BadRequestException('Данный номер отключен');
    }

    const reservation = {
      ...data,
      hotelId: hotelRoom.hotel,
    };

    const newReservation: IDocumentReservation = new this.ReservationModel(
      reservation,
    );
    return newReservation.save();
  }

  async getReservations(
    filter: IReservationSearchOptions,
    select?: string,
    populate?: Array<{ path: string; select: string }>,
  ): Promise<Array<IDocumentReservation>> {
    return this.ReservationModel.find(filter)
      .select('-__v' + select ? ' ' + select : '')
      .populate(populate);
  }

  async removeReservation(id: TID, userId?: string) {
    const reservation = await this.ReservationModel.findById(id);
    if (!reservation) {
      throw new BadRequestException('Данной бронь отсутствует');
    }

    if (userId && reservation.userId.toString() !== userId.toString()) {
      throw new BadRequestException(
        'Данная бронь не принадлежит текущему пользователю',
      );
    }

    return this.ReservationModel.findByIdAndDelete(id);
  }
}
