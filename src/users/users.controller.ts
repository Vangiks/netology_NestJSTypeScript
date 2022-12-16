import {
  Controller,
  Post,
  Body,
  UsePipes,
  UnauthorizedException,
  InternalServerErrorException,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ICreateUser, ISigninUser } from './dto';
import { IDocumentUser } from './model';
import { UserValidationPipe } from './validation';
import { userCreateSchema, userSigninSchema } from './validation/schema';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  // @UsePipes(new UserValidationPipe(userCreateSchema))
  // @Post('signup')
  // async signup(@Body() user: ICreateUser): Promise<IDocumentUser> {
  //   const result = await this.usersService.createUser(user);
  //   if (result) {
  //     return result;
  //   } else {
  //     throw new InternalServerErrorException('Failed to create user');
  //   }
  // }

  // @UsePipes(new UserValidationPipe(userSigninSchema))
  // @Post('signin')
  // async signin(@Body() user: ISigninUser): Promise<string> {
  //   const _user = await this.usersService.getUser(user.email);
  //   if (_user) {
  //     const jwtPayload = {
  //       id: _user.id,
  //       email: _user.email,
  //       firstName: _user.firstName,
  //     };
  //     return this.authService.sign(jwtPayload);
  //   } else {
  //     throw new UnauthorizedException('Failed to authorization user');
  //   }
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('me')
  // async me(@Request() request) {
  //   return request.user;
  // }
}
