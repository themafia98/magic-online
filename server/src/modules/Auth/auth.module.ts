import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../Users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig, signOptions } from './auth.constant';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConfig.SECRET,
      signOptions,
    }),
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
