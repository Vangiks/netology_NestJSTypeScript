import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICreateReservation, IReservationSearchOptions } from './dto';
import { IDocumentReservation, Reservation } from './model';
import { TID } from 'src/types';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private ReservationModel: Model<IDocumentReservation>,
  ) {}

  async addReservation(
    data: ICreateReservation,
  ): Promise<IDocumentReservation | null> {
    try {
      const filter: IReservationSearchOptions = {
        userId: data.userId,
        dateStart: data.dateStart,
        dateEnd: data.dateEnd,
      };
      const reservations: Array<IDocumentReservation | null> =
        await this.getReservations(filter);

      if (reservations.length === 0) {
        throw new Error('Нет доступных мест для бронирования');
      }

      const newReservation: IDocumentReservation = new this.ReservationModel(
        data,
      );
      return newReservation.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async getReservations(
    filter: IReservationSearchOptions,
  ): Promise<Array<IDocumentReservation> | null> {
    try {
      return this.ReservationModel.find(filter).select('-__v');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async removeReservation(id: TID) {
    try {
      return this.ReservationModel.findByIdAndDelete(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return false;
    }
  }
}
