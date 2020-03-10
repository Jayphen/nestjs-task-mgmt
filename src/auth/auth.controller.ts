import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCrendentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCrendentialsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCrendentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(authCrendentialsDto);
  }
}
