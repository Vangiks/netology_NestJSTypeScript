import { Controller } from '@nestjs/common';
import {
  Body,
  Put,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Param,
  Get,
  Query,
} from '@nestjs/common/decorators';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  MulterFileBase64Pipe,
  ParseObjectIdPipe,
  AllowAnonymous,
  ERole,
  Roles,
  RolesGuard,
  GetUser,
  Pagination,
  IPagination,
} from 'src/common';
import { JwtAuthGuard } from 'src/auth/guards';
import {
  ICreateHotelRoom,
  ISearchHotelRoomsParams,
  IUpdateHotelRoom,
} from './dto';
import { HotelRoomService } from './hotel-room.service';
import { HotelRoomValidationPipe } from './validation';
import {
  createHotelRoomSchema,
  searchHotelRoomParamsSchema,
  updateHotelRoomSchema,
} from './validation/schema';
import { User } from 'src/users/model';

@Controller()
export class HotelRoomController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  @AllowAnonymous()
  @UseGuards(JwtAuthGuard)
  @Get('common/hotel-rooms')
  async searchHotelRoom(
    @Query(new HotelRoomValidationPipe(searchHotelRoomParamsSchema))
    params: ISearchHotelRoomsParams,
    @Pagination() pagination: IPagination,
    @GetUser()
    user: User,
  ) {
    const filter: ISearchHotelRoomsParams = {
      ...params,
    };

    if (!user || user.role === ERole.Client) {
      filter.isEnabled = true;
    }
    return await this.hotelRoomService.search(
      filter,
      'id description images',
      pagination,
    );
  }

  @Get('common/hotel-rooms/:id')
  async getHotelRoom(@Param('id', new ParseObjectIdPipe()) id: string) {
    const newHotelRoom = await (
      await this.hotelRoomService.findById(id)
    ).populate({ path: 'hotel', select: 'title description' });
    return {
      id: newHotelRoom._id,
      description: newHotelRoom.description,
      images: newHotelRoom.images,
      hotel: newHotelRoom.hotel,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin)
  @Post('admin/hotel-rooms')
  @UseInterceptors(FilesInterceptor('images'))
  async createHotelRoom(
    @Body(new HotelRoomValidationPipe(createHotelRoomSchema))
    hotelRoom: ICreateHotelRoom,
    @UploadedFiles(new MulterFileBase64Pipe()) images: Array<string>,
  ) {
    const data: ICreateHotelRoom = {
      hotelId: hotelRoom.hotelId,
      description: hotelRoom.description,
      images,
    };
    const newHotelRoom = await (
      await this.hotelRoomService.create(data)
    ).populate({ path: 'hotel', select: 'title description' });
    return {
      id: newHotelRoom._id,
      description: newHotelRoom.description,
      images: newHotelRoom.images,
      isEnabled: newHotelRoom.isEnabled,
      hotel: newHotelRoom.hotel,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin)
  @Put('admin/hotel-rooms/:id')
  @UseInterceptors(FilesInterceptor('images'))
  async updateHotelRoom(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Body(new HotelRoomValidationPipe(updateHotelRoomSchema))
    hotelRoom: IUpdateHotelRoom,
    @UploadedFiles(new MulterFileBase64Pipe())
    images: Array<string>,
  ) {
    const currentHotelRoom = await this.hotelRoomService.findById(id);
    const data: IUpdateHotelRoom = {
      ...hotelRoom,
      images: [...currentHotelRoom.images, ...images],
    };
    const newHotelRoom = await (
      await this.hotelRoomService.update(id, data, { new: true })
    ).populate({ path: 'hotel', select: 'title description' });
    return {
      id: newHotelRoom._id,
      description: newHotelRoom.description,
      images: newHotelRoom.images,
      isEnabled: newHotelRoom.isEnabled,
      hotel: newHotelRoom.hotel,
    };
  }
}
