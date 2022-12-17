import { User } from '../model';

export interface ICreateUser extends Omit<User, 'passwordHash'> {
  password: string;
}

export interface ISearchUserParams extends Omit<User, 'passwordHash' | 'role'> {
  limit: number;
  offset: number;
}
