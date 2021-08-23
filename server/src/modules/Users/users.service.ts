import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser, IUserDocument, User } from '../../schemas/User.schema';
import { Model } from 'mongoose';
import { ICreateUserBody } from '../../interfaces/UsersModule.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly users: Model<IUserDocument>,
  ) {}

  async findOneByName(name: string): Promise<IUserDocument> {
    return this.users.findOne({ $or: [{ username: name }, { email: name }] });
  }

  async create(doc: ICreateUserBody): Promise<IUser> {
    return this.users.create(doc);
  }
}
