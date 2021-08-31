import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConfig } from '../auth.constant';
import { IPayloadUser } from '../../../interfaces/AuthModule.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.SECRET,
    });
  }

  async validate(payload: IPayloadUser) {
    return { userId: payload.sub, username: payload.username };
  }
}
