import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IDocumentUser } from 'src/users/model';
import { UsersService } from 'src/users/users.service';
import { IJWTPayload, IRegisterUser } from './dto';
import * as bcrypt from 'bcrypt';
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
  ): Promise<IDocumentUser | void> {
    const findUser = await this.usersService.findByEmail(email);
    if (!findUser) {
      throw new UnauthorizedException(
        'Пользователя с указанным E-mail не существует',
      );
    }

    if (typeof password !== 'undefined') {
      const isCorectPassword = await this.isValidPassword(
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

  async checkUserByEmail(user: IRegisterUser): Promise<void> {
    const findUser = await this.usersService.findByEmail(user.email);
    if (findUser) {
      throw new BadRequestException(
        'Пользователя с указанным E-mail уже существует',
      );
    }
  }

  // logout(payload: IJWTPayload) {
  //   return this.jwtService.lo(payload);
  // }

  getJwtCookie(jwtToken: string): string {
    return `Authentication=${jwtToken}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  async getPasswordHash(password: string, saltOrRounds = 10): Promise<string> {
    return await bcrypt.hash(password, saltOrRounds);
  }

  async isValidPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
