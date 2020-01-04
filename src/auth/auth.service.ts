import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';

import { LoginDTO, RefreshTokenDTO } from './dto/parameters.dto';
import { IPayload } from '../shared/interfaces/auth.interface';
import { Session } from '../entities/session.entity';
import { User } from '../entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    private readonly userService: UserService,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>
  ) {}

  public async login(data: LoginDTO, userAgent: string) {
    const errorMessage = 'Invalid password or email!';
    const user = await this.userService.getByEmail(data.email);
    if (!user) {
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const isPasswordValid = await user.comparePassword(data.password);
    if (!isPasswordValid) {
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    return this.createSession(user, data.fingerprint, userAgent);
  }

  public async validateUser(payload: IPayload) {
    if (typeof payload.id === 'number') {
      return await this.userService.getById(payload.id);
    } else {
      return null;
    }
  }

  public async refreshToken(data: RefreshTokenDTO) {
    const newSessionUUID = uuid();
    const currentDate = new Date();
    const session = await this.sessionRepository.findOne({
      where: { identifier: data.refreshToken, fingerprint: data.fingerprint },
      relations: ['user']
    });

    if (!session) {
      throw new HttpException('Invalid data!', HttpStatus.BAD_REQUEST);
    }

    const accessToken = sign(
      { id: session.user.id, username: session.user.username },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    if (
      currentDate.getTime() >
      session.updatedAt.getTime() + session.expiresIn
    ) {
      await this.sessionRepository.remove(session);
      throw new HttpException('Session expired!', HttpStatus.UNAUTHORIZED);
    }

    session.identifier = newSessionUUID;

    await this.sessionRepository.save(session);

    return { accessToken, refreshToken: newSessionUUID };
  }

  private async createSession(
    user: User,
    fingerprint: string,
    userAgent: string
  ) {
    try {
      const newSessionUUID = uuid();
      const accessToken = sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );
      const existingSessionsList = await this.sessionRepository.find({
        where: { userId: user.id }
      });

      const isSessionsOverflow =
        existingSessionsList.length >
        parseInt(process.env.MAX_SESSIONS_NUMBER_PER_USER);

      if (isSessionsOverflow) {
        await this.sessionRepository.remove(existingSessionsList);
      }

      const existingSession = existingSessionsList.find(
        ses => ses.fingerprint === fingerprint && ses.userAgent === userAgent
      );
      if (!existingSession || isSessionsOverflow) {
        const session = new Session();

        session.user = user;
        session.userAgent = userAgent;
        session.identifier = newSessionUUID;
        session.fingerprint = fingerprint;
        session.expiresIn = 1000 * 60 * 60 * 24 * 30; // 30 days

        await this.sessionRepository.save(session);
      } else {
        existingSession.identifier = newSessionUUID;
        await this.sessionRepository.save(existingSession);
      }

      this.logger.verbose(
        `New auth session for "${user.username}" was created!`
      );
      return { accessToken, refreshToken: newSessionUUID };
    } catch (error) {
      this.logger.error('Filed to create a session!', error.trace);
      throw new HttpException('Bad request!', HttpStatus.BAD_REQUEST);
    }
  }
}
