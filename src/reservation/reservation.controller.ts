import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Delete, Get, Param } from '@nestjs/common/decorators';
import {
  ParseObjectIdPipe,
  ERole,
  Roles,
  RolesGuard,
  GetUser,
} from 'src/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { ICreateReservation, IReservationSearchOptions } from './dto';
import { ReservationService } from './reservation.service';
import { ReservationValidationPipe } from './validation';
import { createReservationSchema } from './validation/schema';
import { User } from 'src/users/model';
@Controller()
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Client)
  @Get('client/reservations')
  async getReservationsCurrentUser(
    @GetUser()
    user: User,
  ) {
    const filter: IReservationSearchOptions = {
      userId: user.id,
    };
    const findReservation = await this.reservationService.getReservations(
      filter,
      '-_id dateStart dateEnd roomId hotelId',
      [
        { path: 'roomId', select: '-_id description images' },
        { path: 'hotelId', select: '-_id title description' },
      ],
    );

    return findReservation.map((reservation) => ({
      startDate: reservation.dateStart,
      endDate: reservation.dateEnd,
      hotelRoom: reservation.roomId,
      hotel: reservation.hotelId,
    }));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Manager)
  @Get('manager/reservations/:userId')
  async getReservations(
    @Param('userId', new ParseObjectIdPipe()) userId: string,
  ) {
    const filter: IReservationSearchOptions = {
      userId,
    };
    const findReservation = await this.reservationService.getReservations(
      filter,
      '-_id dateStart dateEnd roomId hotelId',
      [
        { path: 'roomId', select: '-_id description images' },
        { path: 'hotelId', select: '-_id title description' },
      ],
    );

    return findReservation.map((reservation) => ({
      startDate: reservation.dateStart,
      endDate: reservation.dateEnd,
      hotelRoom: reservation.roomId,
      hotel: reservation.hotelId,
    }));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Client)
  @Post('client/reservations')
  async addReservationCurrentUser(
    @Body(new ReservationValidationPipe(createReservationSchema))
    reservation: ICreateReservation,
    @GetUser()
    user: User,
  ) {
    const data = {
      userId: user.id,
      roomId: reservation.hotelRoom,
      dateStart: reservation.startDate,
      dateEnd: reservation.endDate,
    };
    const newReservation = await (
      await this.reservationService.addReservation(data)
    ).populate([
      { path: 'roomId', select: '-_id description images' },
      { path: 'hotelId', select: '-_id title description' },
    ]);
    return {
      startDate: newReservation.dateStart,
      endDate: newReservation.dateEnd,
      hotelRoom: newReservation.roomId,
      hotel: newReservation.hotelId,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Client)
  @Delete('client/reservations/:id')
  async removeReservationCurrentUser(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @GetUser()
    user: User,
  ) {
    await this.reservationService.removeReservation(id, user._id);
    return null;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Manager)
  @Delete('manager/reservations/:id')
  async removeReservation(@Param('id', new ParseObjectIdPipe()) id: string) {
    await this.reservationService.removeReservation(id);
    return null;
  }
}
