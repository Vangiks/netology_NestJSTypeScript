import { IUser } from '../user.interface';

export interface ICreateUser extends Omit<IUser, 'passwordHash'> {
  password: string;
}

export interface ISearchUserParams extends Omit<IUser, 'passwordHash' | 'role'> {
  limit: number;
  offset: number;
}
