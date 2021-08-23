import { Injectable } from '@nestjs/common';
import { IUser, IUserDocument } from '../../schemas/User.schema';
import { JwtService } from '@nestjs/jwt';
import { IPayloadUser } from '../../interfaces/AuthModule.interface';
import { UsersService } from '../Users/users.service';

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
    const user = await this.usersService.findOneByName(username);
    if (user && user.password === requestPassword) {
      const { password, ...result } = user;
      return result as IUserDocument;
    }

    return null;
  }

  async login({ _doc: user }: { _doc: IUser }) {
    return {
      accessToken: this.jwtService.sign({
        username: user.username,
        name: user.name,
        sub: user.user_id,
      } as IPayloadUser),
    };
  }
}
