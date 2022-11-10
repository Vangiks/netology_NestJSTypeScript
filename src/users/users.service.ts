import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDocumentUser, User } from './model';
import { ICreateUser } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<IDocumentUser>,
  ) {}

  async getUserById(id: string): Promise<IDocumentUser | null> {
    try {
      return this.UserModel.findById(id).select('-__v');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async getUser(email: string): Promise<IDocumentUser | null> {
    try {
      return this.UserModel.findOne({ email }).select('-__v');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async createUser(user: ICreateUser): Promise<IDocumentUser | null> {
    try {
      const newUser = new this.UserModel(user);
      return newUser.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }
}
