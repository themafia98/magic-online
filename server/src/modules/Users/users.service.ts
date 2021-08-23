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

  async findAll(): Promise<IUserDocument[]> {
    return this.users.find();
  }

  async findOne(id: string): Promise<IUserDocument> {
    return this.users.findOne({ _id: id });
  }

  async create(doc: ICreateUserBody): Promise<IUser> {
    return this.users.create(doc);
  }
}
