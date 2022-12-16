import { TID } from 'src/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDocumentUser, User } from './model';
import { ICreateUser, ISearchUserParams } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<IDocumentUser>,
  ) {}

  async create(data: ICreateUser): Promise<IDocumentUser | null> {
    try {
      const newUser: IDocumentUser = new this.UserModel(data);
      return newUser.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async findById(id: TID): Promise<IDocumentUser | null> {
    try {
      return this.UserModel.findById(id).select('-__v');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async findByEmail(email: string): Promise<IDocumentUser | null> {
    try {
      return this.UserModel.findOne({ email }).select('-__v');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async findAll(
    params: ISearchUserParams,
  ): Promise<Array<IDocumentUser> | null> {
    try {
      const filter = {
        name: { $regex: params.name },
        email: { $regex: params.email },
        contactPhone: { $regex: params.contactPhone },
      };
      return this.UserModel.find(filter)
        .select('-__v')
        .skip(params.offset)
        .limit(params.limit);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }
}
