import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  greeting() {
    return 'CinemaAPI v1.0.0';
  }
}
