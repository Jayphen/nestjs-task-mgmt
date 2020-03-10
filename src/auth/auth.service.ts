import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(authCrendentialsDto: AuthCredentialsDto) {
    return this.userRepository.signup(authCrendentialsDto);
  }

  async signIn(authCrendentialsDto: AuthCredentialsDto) {
    const username = await this.userRepository.validateUserPassword(
      authCrendentialsDto,
    );

    if (!username) {
      throw new UnauthorizedException(`Invalid credentials`);
    }

    return username;
  }
}
