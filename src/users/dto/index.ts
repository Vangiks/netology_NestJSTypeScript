import { User } from '../model';

export interface ICreateUser extends Partial<User> {}

export interface ISearchUserParams extends Omit<User, 'passwordHash' | 'role'> {
  limit: number;
  offset: number;
}
