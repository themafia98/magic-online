import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IUser, IUserDocument } from '../../schemas/User.schema';
import { JwtService } from '@nestjs/jwt';
import { IPayloadUser } from '../../interfaces/AuthModule.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    requestPassword: string,
  ): Promise<IUserDocument> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === requestPassword) {
      const { password, ...result } = user;
      return result as IUserDocument;
    }

    return null;
  }

  async login(user: IUser) {
    return {
      accessToken: this.jwtService.sign({
        username: user.username,
        sub: user.user_id,
      } as IPayloadUser),
    };
  }
}
