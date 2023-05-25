import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async login(@Body() { username, password }: SignInDTO) {
    return this.authService.validateUser(username, password);
  }

  @Post('sign-up')
  async signUp() {}
}
