import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IReservationSearchOptions, IReservationDto } from './dto';
import { Reservation } from './model';
import { TID } from 'src/common';
import { HotelRoomService } from 'src/hotel/hotel-room/hotel-room.service';
import { HotelRoom } from 'src/hotel/hotel-room/model';
import { Hotel } from 'src/hotel/model';
import { ICreateReservation } from './reservation.interface';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private ReservationModel: Model<Reservation>,
    private readonly hotelRoomService: HotelRoomService,
  ) {}

  async addReservation(data: ICreateReservation): Promise<IReservationDto> {
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

    const newReservation: Reservation = new this.ReservationModel(reservation);
    await newReservation.save();
    return newReservation
      .populate<{ roomId: HotelRoom; hotelId: Hotel }>([
        { path: 'roomId', select: '-_id description images' },
        { path: 'hotelId', select: '-_id title description' },
      ])
      .then((reservation) => ({
        startDate: reservation.dateStart,
        endDate: reservation.dateEnd,
        hotelRoom: reservation.roomId,
        hotel: reservation.hotelId,
      }));
  }

  async getReservations(
    filter: IReservationSearchOptions,
  ): Promise<Array<IReservationDto>> {
    return this.ReservationModel.find(filter)
      .select('-_id dateStart dateEnd roomId hotelId')
      .populate<{ roomId: HotelRoom; hotelId: Hotel }>([
        { path: 'roomId', select: '-_id description images' },
        { path: 'hotelId', select: '-_id title description' },
      ])
      .orFail()
      .then((reservations) =>
        reservations.map((reservation) => ({
          startDate: reservation.dateStart,
          endDate: reservation.dateEnd,
          hotelRoom: reservation.roomId,
          hotel: reservation.hotelId,
        })),
      );
  }

  async removeReservation(id: TID, userId?: string): Promise<void> {
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
