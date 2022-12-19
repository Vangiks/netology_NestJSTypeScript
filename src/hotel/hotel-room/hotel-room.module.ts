import { Module } from '@nestjs/common';
import { HotelRoomController } from './hotel-room.controller';
import { HotelRoomService } from './hotel-room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelRoom, HotelRoomModel } from './model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HotelRoom.name, schema: HotelRoomModel },
    ]),
  ],
  controllers: [HotelRoomController],
  providers: [HotelRoomService],
  exports: [HotelRoomService],
})
export class HotelRoomModule {}
