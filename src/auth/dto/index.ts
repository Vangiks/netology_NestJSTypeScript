import { IUser } from 'src/users/user.interface';

export interface IRegisterUser extends Omit<IUser, 'passwordHash' | 'role'> {
  password: string;
}

export interface IJWTPayload extends Omit<IUser, 'passwordHash'> {}
