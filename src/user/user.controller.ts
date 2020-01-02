import { UserService } from './user.service';
import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getUsers() {
    const users = await this.userService.getAllUsers();
    return users.map(user => user.toResponseObject());
  }
}
