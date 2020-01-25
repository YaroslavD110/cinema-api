import {
  Injectable,
  Logger,
  BadRequestException,
  InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

import { UserDTO } from './dto/user.dto';
import { User } from '../../entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  public getAllUsers() {
    return this.userRepository.find();
  }

  public getByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  public getByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  public getById(id: number) {
    return this.userRepository.findOne(id);
  }

  public async createUser(data: UserDTO) {
    const user = new User();

    user.username = data.username;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;

    try {
      user.salt = await genSalt(parseInt(process.env.SALT_LENGTH));
      user.password = await hash(data.password, user.salt);

      await this.userRepository.save(user);

      this.logger.log(`User "${user.username}" was created!`);

      return user.toResponseObject();
    } catch (error) {
      this.logger.error('Filed to create new User!', error.trace);

      if (error.code == 23505) {
        throw new BadRequestException('Duplicated unique value!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  public async isEmailExist(email: string) {
    const numberOfUsers = await this.userRepository.count({ where: { email } });
    return numberOfUsers !== 0;
  }

  public async isUsernameExist(username: string) {
    const numberOfUsers = await this.userRepository.count({
      where: { username }
    });
    return numberOfUsers !== 0;
  }
}
