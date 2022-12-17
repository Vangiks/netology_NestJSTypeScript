import { User } from 'src/users/model';

export interface IRegisterUser extends Omit<User, 'passwordHash' | 'role'> {
  password: string;
}

export interface IJWTPayload extends Omit<User, 'passwordHash'> {}
