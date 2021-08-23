import {
  Controller,
  Get,
  Post,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { LocalGuard } from './guard/local.guard';
import { GlobalExceptionFilter } from '../../filters/GlobalExceptionFilter/GlobalExcepationFilter';
import { JwtGuard } from './guard/jwt.guard';
import { AuthService } from './auth.service';

@Controller('/auth')
@UseFilters(GlobalExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtGuard)
  @Get('/me')
  getProfile(@Request() req) {
    console.log('req.user:', req.user);
    return req.user;
  }
}
