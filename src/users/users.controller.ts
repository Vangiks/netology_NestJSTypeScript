import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ICreateUser, ISearchUserParams } from './dto';
import {} from './model';
import { UserValidationPipe } from './validation';
import { createUserSchema, searchUserParamsSchema } from './validation/schema';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RolesGuard } from './roles.guard';
import { ERole, Roles } from './types';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin)
  @Post('admin/users')
  async createUser(
    @Body(new UserValidationPipe(createUserSchema)) user: ICreateUser,
  ): Promise<any> {
    const newUser = await this.usersService.create(user);
    return {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      contactPhone: newUser.contactPhone,
      role: newUser.role,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin)
  @Get('admin/users')
  async getAdminUsers(
    @Body(new UserValidationPipe(searchUserParamsSchema))
    params: ISearchUserParams,
  ): Promise<any> {
    return await this.usersService.findAll(params, 'email name contactPhone');
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Manager)
  @Get('manager/users')
  async getManagerUsers(
    @Body(new UserValidationPipe(searchUserParamsSchema))
    params: ISearchUserParams,
  ): Promise<any> {
    return await this.usersService.findAll(params, 'email name contactPhone');
  }
}
