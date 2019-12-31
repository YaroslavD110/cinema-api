import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { GetByIdParams } from '../shared/dto/params.dto';
import { FilmDTO } from './dto/film.dto';
import { FilmsService } from './films.service';

@Controller()
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('/films')
  getFilms() {
    return this.filmsService.getFilms();
  }

  @Get('/film/:id')
  getFilmById(@Param() params: GetByIdParams) {
    return this.filmsService.getFilmById(params.id);
  }

  @Post('/film')
  addFilm(@Body() data: FilmDTO) {
    return this.filmsService.addFilm(data);
  }
}
