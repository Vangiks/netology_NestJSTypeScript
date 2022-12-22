import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/model';
import { UsersService } from 'src/users/users.service';
import { IJWTPayload, IRegisterUser } from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    readonly configService: ConfigService,
  ) {}

  async validateUser(
    email: string,
    password?: string,
  ): Promise<User | void> {
    const findUser = await this.usersService.findByEmail(email);
    if (!findUser) {
      throw new UnauthorizedException(
        'Пользователя с указанным E-mail не существует',
      );
    }

    if (typeof password !== 'undefined') {
      const isCorectPassword = await this.usersService.isValidPassword(
        password,
        findUser.passwordHash,
      );
      if (!isCorectPassword) {
        throw new UnauthorizedException('Указан некорректный пароль');
      }
    }
    return findUser;
  }

  login(payload: IJWTPayload) {
    return this.jwtService.sign(payload);
  }

  getJwtCookie(jwtToken: string): string {
    return `Authentication=${jwtToken}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }
}
