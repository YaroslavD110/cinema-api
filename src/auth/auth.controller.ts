import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Body,
  Get,
  HttpException,
  HttpStatus
} from '@nestjs/common';

import { LoginDTO } from './dto/parameters.dto';
import { UserDTO } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Post('/register')
  public register(@Body() data: UserDTO) {
    return this.userService.createUser(data);
  }

  @Post('/login')
  public async login(@Body() data: LoginDTO) {
    const errorMessage = 'Invalid password or email!';
    const user = await this.userService.getByEmail(data.email);
    if (!user) {
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const isPasswordValid = await user.comparePassword(data.password);
    if (!isPasswordValid) {
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const token = this.authService.signUser(user);

    return { token };
  }
}
