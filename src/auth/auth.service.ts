import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: string): Promise<any> {
    const user = await this.usersService.getUserById(id);
    if (user) {
      return user;
    }
    return null;
  }

  sign(payload: { id: string; email: string; firstName: string }) {
    return this.jwtService.sign(payload);
  }
}
