import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { GetByIdParams } from '../shared/dto/params.dto';
import { FilmDTO } from './dto/film.dto';
import { FilmsService } from './films.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Films')
@Controller('film')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('/')
  getFilms() {
    return this.filmsService.getFilms();
  }

  @Get(':id')
  getFilmById(@Param() params: GetByIdParams) {
    return this.filmsService.getFilmById(params.id);
  }

  @Post('/')
  addFilm(@Body() data: FilmDTO) {
    return this.filmsService.addFilm(data);
  }
}
