import { FilmsService } from './films.service';
import { Controller, Put, Get } from '@nestjs/common';

@Controller()
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('/films')
  getFilms() {
    return this.filmsService.getFilms();
  }
}
