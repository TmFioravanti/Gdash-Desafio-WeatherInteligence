import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../users/dto/login.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // /auth/login usando LocalStrategy
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() _dto: LoginDto) {
    return this.authService.login(req.user);
  }
}
