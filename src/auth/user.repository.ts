import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signup(authCrendentialsDto: AuthCredentialsDto) {
    const { password, username } = authCrendentialsDto;

    const user = new User();

    user.username = username;
    user.password = password;
    try {
      await user.save();
    } catch (err) {
      if (err.code === '23505') {
        // duplicate username
        throw new ConflictException(`Username ${username} already exists`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
