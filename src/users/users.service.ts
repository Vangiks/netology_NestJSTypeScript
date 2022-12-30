import { TID } from 'src/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './model';
import { ICreateUser, ISearchUserParams } from './dto';
import * as bcrypt from 'bcrypt';
import { IUserService } from './user.interface';

@Injectable()
export class UsersService implements IUserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async create(data: ICreateUser): Promise<User> {
    await this.checkUserByEmail(data.email);
    const user = {
      name: data.name,
      email: data.email,
      contactPhone: data.contactPhone,
      role: data.role,
      passwordHash: await this.getPasswordHash(data.password),
    };
    const newUser: User = new this.UserModel(user);
    return newUser.save();
  }

  async findById(id: TID): Promise<User> {
    return this.UserModel.findById(id).select('-__v');
  }

  async findByEmail(email: string): Promise<User> {
    return this.UserModel.findOne({ email }).select('-__v');
  }

  async findAll(
    params: ISearchUserParams,
    select?: string,
  ): Promise<Array<User>> {
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
