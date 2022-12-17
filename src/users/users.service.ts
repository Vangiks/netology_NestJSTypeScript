import { TID } from 'src/types';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDocumentUser, User } from './model';
import { ICreateUser, ISearchUserParams } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<IDocumentUser>,
  ) {}

  async create(data: ICreateUser): Promise<IDocumentUser> {
    await this.checkUserByEmail(data.email);
    const user = {
      name: data.name,
      email: data.email,
      contactPhone: data.contactPhone,
      role: data.role,
      passwordHash: await this.getPasswordHash(data.password),
    };
    const newUser: IDocumentUser = new this.UserModel(user);
    return newUser.save();
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
    select?: string,
  ): Promise<Array<IDocumentUser> | null> {
    try {
      const filter = {
        name: { $regex: params.name },
        email: { $regex: params.email },
        contactPhone: null,
      };

      if (params.contactPhone) {
        filter.contactPhone = { $regex: params.contactPhone };
      } else delete filter.contactPhone;

      return this.UserModel.find(filter)
        .select('-__v' + select ? ' ' + select : '')
        .skip(params.offset)
        .limit(params.limit);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  }

  async checkUserByEmail(email: string): Promise<void> {
    const findUser = await this.findByEmail(email);
    if (findUser) {
      throw new BadRequestException(
        'Пользователь с указанным E-mail уже существует',
      );
    }
  }

  async isValidPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async getPasswordHash(password: string, saltOrRounds = 10): Promise<string> {
    return await bcrypt.hash(password, saltOrRounds);
  }
}
