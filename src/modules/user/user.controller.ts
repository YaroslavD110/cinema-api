import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getUsers() {
    const users = await this.userService.getAllUsers();
    return users.map(user => user.toResponseObject());
  }
}
