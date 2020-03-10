import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signup(authCrendentialsDto: AuthCredentialsDto) {
    const { password, username } = authCrendentialsDto;

    const user = new User();

    user.username = username;
    user.password = password;
    await user.save();
  }
}
