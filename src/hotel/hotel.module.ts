import { forwardRef, Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelModel } from './model';
import { HotelRoomModule } from './hotel-room/hotel-room.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelModel }]),
    forwardRef(() => HotelRoomModule),
  ],
  providers: [HotelService],
  controllers: [HotelController],
  exports: [HotelService],
})
export class HotelModule {}
