import {
  Body,
  Controller,
  HttpStatus,
  Put,
  Res,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from '../../schemas/User.schema';
import { ICreateUserBody } from '../../interfaces/UsersModule.interface';
import { MongoExceptionFilter } from '../../filters/MongoExceptionFilter/MongoExceptionFilter';
import { GlobalExceptionFilter } from '../../filters/GlobalExceptionFilter/GlobalExcepationFilter';

@Controller('/users')
@UseFilters(GlobalExceptionFilter)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Put('/create')
  @UseFilters(MongoExceptionFilter)
  async createUser(@Body() formData: ICreateUserBody): Promise<IUser> {
    return this.userService.create(formData);
  }
}
