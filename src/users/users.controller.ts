import { Controller, Post, Body, Get, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ICreateUser, ISearchUserParams } from './dto';
import {} from './model';
import { UserValidationPipe } from './validation';
import { createUserSchema, searchUserParamsSchema } from './validation/schema';
import { JwtAuthGuard } from 'src/auth/guards';
import { ERole, Roles, RolesGuard } from 'src/common';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin)
  @Post('admin/users')
  async createUser(
    @Body(new UserValidationPipe(createUserSchema)) user: ICreateUser,
  ) {
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
    @Query(new UserValidationPipe(searchUserParamsSchema))
    params: ISearchUserParams,
  ) {
    return await this.usersService.findAll(params, 'email name contactPhone');
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Manager)
  @Get('manager/users')
  async getManagerUsers(
    @Query(new UserValidationPipe(searchUserParamsSchema))
    params: ISearchUserParams,
  ) {
    return await this.usersService.findAll(params, 'email name contactPhone');
  }
}
