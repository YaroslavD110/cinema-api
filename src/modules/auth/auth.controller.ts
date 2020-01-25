import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Controller, Post, Body, Req } from '@nestjs/common';

import { LoginDTO, RefreshTokenDTO } from './dto/parameters.dto';
import { UserDTO } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@ApiTags('Auth')
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
  public login(@Req() req: Request, @Body() data: LoginDTO) {
    const userAgent = req.headers['user-agent'];

    return this.authService.login(data, userAgent);
  }

  @Post('/refresh')
  public refresh(@Body() data: RefreshTokenDTO) {
    return this.authService.refreshToken(data);
  }
}
