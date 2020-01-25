import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';

import { FilmsService } from './film.service';
import { FilmQueryDTO } from './dto/params.dto';
import { GetByIdParams, GetBySlugParams } from '../../shared/dto/params.dto';
import { FilmDTO } from './dto/film.dto';

@ApiTags('Films')
@Controller('film')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  // @Get('/')
  // getFilms(@Query() params: FilmQueryDTO) {
  //   return this.filmsService.getFilms(params);
  // }

  // @Get('/count')
  // countFilms() {
  //   return this.filmsService.countFilms();
  // }

  // @Get(':id')
  // getFilmById(@Param() params: GetByIdParams) {
  //   return this.filmsService.getFilmById(params.id);
  // }

  // @Get('/slug/:slug')
  // getFilmBySlug(@Param() params: GetBySlugParams) {
  //   return this.filmsService.getFilmBySlug(params.slug);
  // }

  // @Post('/')
  // addFilm(@Body() data: FilmDTO) {
  //   return this.filmsService.addFilm(data);
  // }
}
