import 'reflect-metadata';
import { injectable } from 'inversify';

import Users, { TDocumentUser } from './model';
import { IUser } from './dto';

interface IOptions {
  usernameField: string;
  passwordField: string;
}

@injectable()
class UsersService {
  databasePath: string;
  options: IOptions;

  constructor() {
    this.databasePath = process.env.DATABASE_PATH;
    this.options = {
      usernameField: 'username',
      passwordField: 'password',
    };
  }

  static verifyPassword(user: IUser, password: string): boolean {
    return user.password === password;
  }

  static isUser(user: Express.User): user is TDocumentUser {
    return user ? 'id' in user : false;
  }

  async verify(
    username: string,
    password: string,
    done: (error: Error | null, user: IUser | boolean) => void
  ) {
    const user = await Users.findOne({ username }).select('-__v');
    if (!user) {
      return done(null, false);
    }

    if (!UsersService.verifyPassword(user, password)) {
      return done(null, false);
    }

    return done(null, user);
  }

  async getUser(id: string): Promise<TDocumentUser | null> {
    try {
      const user = await Users.findById(id).select('-__v');
      return user;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async createUser(user: IUser): Promise<TDocumentUser | null> {
    try {
      const emails = Array.isArray(user.emails) ? user.emails : [user.emails];
      return await new Users({ ...user, emails }).save();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }
}

export default UsersService;
