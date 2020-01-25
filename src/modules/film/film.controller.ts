import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Query } from '@nestjs/common';

import { CRUDController } from './../../shared/crud/crud.controller';
import { FilmsService } from './film.service';
import { FilmQueryDTO } from './dto/params.dto';
import { FilmDTO } from './dto/film.dto';

@ApiTags('Films')
@Controller('film')
export class FilmsController extends CRUDController {
  constructor(private readonly filmsService: FilmsService) {
    super(filmsService);
  }

  @Get('/')
  getAll(@Query() params: FilmQueryDTO) {
    return this.filmsService.getFilms(params);
  }

  @Get('/count')
  countFilms() {
    return this.filmsService.countFilms();
  }

  // @Post('/')
  // addFilm(@Body() data: FilmDTO) {
  //   return this.filmsService.addFilm(data);
  // }
}
