import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuid from 'uuid/v4';
import { sign } from 'jsonwebtoken';

import { Session } from '../entities/session.entity';
import { User } from '../entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>
  ) {}

  public signUser(user: User) {
    return sign(user.toResponseObject(), process.env.JWT_SECRET, {
      expiresIn: '15m'
    });
  }
}
