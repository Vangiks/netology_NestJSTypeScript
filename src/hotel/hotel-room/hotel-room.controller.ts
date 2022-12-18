import { Controller, Get } from '@nestjs/common';
import { Post } from '@nestjs/common/decorators';
import { HotelRoomService } from './hotel-room.service';

@Controller()
export class HotelRoomController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  //   @Post('admin/hotel-rooms')
  //   async createHotelRoom() {
  //     const newHotelRoom = await this.hotelRoomService.create();

  //   }
}
