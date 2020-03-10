import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { JwtPayload } from 'src/auth/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
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

    const payload: JwtPayload = { username };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
