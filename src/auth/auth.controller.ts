import { Controller, Post, Body, UseGuards, Req, Res } from '@nestjs/common';
import { ICreateUser } from 'src/users/dto';
import { IDocumentUser } from 'src/users/model';
import { ERole } from 'src/common';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './auth.guard';
import { IJWTPayload, IRegisterUser } from './dto';
import { LocalAuthGuard } from './local.guard';
import { Response } from 'express';
import { loginSchema, registerSchema } from './validation/schema';
import { AuthValidationPipe } from './validation';

@Controller()
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Body(new AuthValidationPipe(loginSchema)) _body,
    @Req()
    request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ access_token: string }> {
    const user: IDocumentUser = request.user;
    const jwtPayload: IJWTPayload = {
      name: user.name,
      email: user.email,
      contactPhone: user.contactPhone,
      role: user.role,
    };

    const jwtToken = this.authService.login(jwtPayload);

    response.setHeader('Set-Cookie', this.authService.getJwtCookie(jwtToken));

    return { access_token: jwtToken };
  }

  @Post('client/register')
  async register(
    @Body(new AuthValidationPipe(registerSchema)) user: IRegisterUser,
  ): Promise<{ id: string; email: string; name: string }> {
    const createUser: ICreateUser = {
      name: user.name,
      contactPhone: user.contactPhone,
      email: user.email,
      password: user.password,
      role: ERole.Client,
    };
    const registerUser = await this.usersService.create(createUser);
    return {
      id: registerUser._id,
      email: registerUser.email,
      name: registerUser.name,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/logout')
  async logout(@Res({ passthrough: true }) response: Response): Promise<null> {
    response.setHeader('Set-Cookie', this.authService.getJwtCookie(null));
    return null;
  }
}
