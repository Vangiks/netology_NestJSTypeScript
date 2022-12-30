import { ERole, TID } from 'src/common';
import { ICreateUser, ISearchUserParams } from './dto';
import { User } from './model';

export interface IUser {
  email: string;
  passwordHash: string;
  name: string;
  contactPhone?: string;
  role: ERole;
}

export interface IUserService {
  create(data: Partial<ICreateUser>): Promise<User>;
  findById(id: TID): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(params: ISearchUserParams, select?: string): Promise<Array<User>>;
}
