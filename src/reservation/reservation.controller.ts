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
import {
  ICreateReservationDto,
  IReservationDto,
  IReservationSearchOptions,
} from './dto';
import { ReservationService } from './reservation.service';
import { ReservationValidationPipe } from './validation';
import { createReservationSchema } from './validation/schema';
import { User } from 'src/users/model';
import { ICreateReservation } from './reservation.interface';
@Controller()
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Client)
  @Get('client/reservations')
  async getReservationsCurrentUser(
    @GetUser()
    user: User,
  ): Promise<Array<IReservationDto>> {
    const filter: IReservationSearchOptions = {
      userId: user.id,
    };
    return await this.reservationService.getReservations(filter);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Manager)
  @Get('manager/reservations/:userId')
  async getReservations(
    @Param('userId', new ParseObjectIdPipe()) userId: string,
  ): Promise<Array<IReservationDto>> {
    const filter: IReservationSearchOptions = {
      userId,
    };
    return await this.reservationService.getReservations(filter);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Client)
  @Post('client/reservations')
  async addReservationCurrentUser(
    @Body(new ReservationValidationPipe(createReservationSchema))
    reservation: ICreateReservationDto,
    @GetUser()
    user: User,
  ): Promise<IReservationDto> {
    const data: ICreateReservation = {
      userId: user.id,
      roomId: reservation.hotelRoom,
      dateStart: reservation.startDate,
      dateEnd: reservation.endDate,
    };
    return await this.reservationService.addReservation(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Client)
  @Delete('client/reservations/:id')
  async removeReservationCurrentUser(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @GetUser()
    user: User,
  ): Promise<null> {
    await this.reservationService.removeReservation(id, user._id);
    return null;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Manager)
  @Delete('manager/reservations/:id')
  async removeReservation(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<null> {
    await this.reservationService.removeReservation(id);
    return null;
  }
}
