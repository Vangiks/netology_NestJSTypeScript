import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Delete, Get, Param } from '@nestjs/common/decorators';
import { ParseObjectIdPipe, ERole, Roles } from 'src/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/users/roles.guard';
import { ICreateReservation, IReservationSearchOptions } from './dto';
import { ReservationService } from './reservation.service';
import { ReservationValidationPipe } from './validation';
import { createReservationSchema } from './validation/schema';
@Controller()
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Client)
  @Get('client/reservations')
  async getReservationsCurrentUser(@Req() request) {
    const filter: IReservationSearchOptions = {
      userId: request.user.id,
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
    @Req() request,
  ) {
    const user = request.user;
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
    @Req() request,
  ) {
    const user = request.user;
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
