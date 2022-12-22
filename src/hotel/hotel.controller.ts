import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ParseObjectIdPipe, ERole, Roles, RolesGuard } from 'src/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { ICreateHotel, ISearchHotelParams, IUpdateHotel } from './dto';
import { HotelService } from './hotel.service';
import { HotelValidationPipe } from './validation';
import {
  createHotelSchema,
  searchHotelParamsSchema,
  updateHotelSchema,
} from './validation/schema';

@Controller('admin/hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin)
  @Get()
  async getHotels(
    @Query(new HotelValidationPipe(searchHotelParamsSchema))
    params: ISearchHotelParams,
  ) {
    return await this.hotelService.search(params, 'id title description');
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin)
  @Post()
  async createHotel(
    @Body(new HotelValidationPipe(createHotelSchema)) hotel: ICreateHotel,
  ) {
    const newHotel = await this.hotelService.create(hotel);
    return {
      id: newHotel._id,
      title: newHotel.title,
      description: newHotel.description,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin)
  @Put(':id')
  async updateHotel(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Body(new HotelValidationPipe(updateHotelSchema)) hotel: IUpdateHotel,
  ) {
    const updateHotel = await this.hotelService.update(id, hotel, {
      new: true,
    });
    return {
      id: updateHotel._id,
      title: updateHotel.title,
      description: updateHotel.description,
    };
  }
}
