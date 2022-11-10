import {
  Controller,
  Post,
  Body,
  UsePipes,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ICreateUser, ISigninUser } from './dto';
import { IDocumentUser } from './model';
import { UserValidationPipe } from './validation';
import { userCreateSchema, userSigninSchema } from './validation/schema';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UsePipes(new UserValidationPipe(userCreateSchema))
  @Post()
  async signup(@Body() user: ICreateUser): Promise<IDocumentUser> {
    const result = await this.usersService.createUser(user);
    if (result) {
      return result;
    } else {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  @UsePipes(new UserValidationPipe(userSigninSchema))
  @Post()
  async signin(@Body() user: ISigninUser): Promise<string> {
    const _user = await this.usersService.getUser(user.email);
    if (user) {
      const jwtPayload = {
        id: _user.id,
        email: _user.email,
        firstName: _user.firstName,
      };
      return this.authService.sign(jwtPayload);
    } else {
      throw new UnauthorizedException('Failed to authorization user');
    }
  }
}
