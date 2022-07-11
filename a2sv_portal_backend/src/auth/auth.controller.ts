import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('signin')
  signin() {
    return 'Sigin';
  }
  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    console.log(dto);
    return await this.authService.signup(dto);
  }
}
