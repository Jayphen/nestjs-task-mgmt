import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signup(authCrendentialsDto: AuthCredentialsDto) {
    const { password, username } = authCrendentialsDto;

    const user = new User();

    user.salt = await genSalt();
    user.username = username;
    user.password = await this.hashPassword(password, user.salt);
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

  private async hashPassword(password: string, salt: string) {
    return hash(password, salt);
  }
}
