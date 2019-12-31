import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { LabelsService } from './labels.service';
import { GetByIdParams, GetBySlugParams } from '../shared/dto/params.dto';
import { DirectorDTO } from './dto/director.dto';
import { LabelDTO } from './dto/label.dto';

@Controller()
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Get('/countries')
  getCountries() {
    return this.labelsService.countryService.getAll();
  }

  @Get('/country/:id')
  getCountryById(@Param() params: GetByIdParams) {
    return this.labelsService.countryService.getById(params.id);
  }

  @Get('/country/slug/:slug')
  getCountryBySlug(@Param() params: GetBySlugParams) {
    return this.labelsService.countryService.getBySlug(params.slug);
  }

  @Post('/country')
  addCountry(@Body() data: LabelDTO) {
    return this.labelsService.countryService.add(data);
  }

  @Delete('/country/:id')
  deleteCountry(@Param() params: GetByIdParams) {
    return this.labelsService.countryService.delete(params.id);
  }

  @Get('/genres')
  getGenres() {
    return this.labelsService.genreService.getAll();
  }

  @Get('/genre/:id')
  getGenreById(@Param() params: GetByIdParams) {
    return this.labelsService.genreService.getById(params.id);
  }

  @Get('/genre/slug/:slug')
  getGenreBySlug(@Param() params: GetBySlugParams) {
    return this.labelsService.genreService.getBySlug(params.slug);
  }

  @Post('/genre')
  addGenre(@Body() data: LabelDTO) {
    return this.labelsService.genreService.add(data);
  }

  @Delete('/genre/:id')
  deleteGenre(@Param() params: GetByIdParams) {
    return this.labelsService.genreService.delete(params.id);
  }

  @Get('/directors')
  getDirectors() {
    return this.labelsService.directorService.getAll();
  }

  @Get('/director/:id')
  getDirectorById(@Param() params: GetByIdParams) {
    return this.labelsService.directorService.getById(params.id);
  }

  @Get('/director/slug/:slug')
  getDirectorBySlug(@Param() params: GetBySlugParams) {
    return this.labelsService.directorService.getBySlug(params.slug);
  }

  @Post('/director')
  addDirector(@Body() data: DirectorDTO) {
    return this.labelsService.directorService.add(data);
  }

  @Delete('/director/:id')
  deleteDirector(@Param() params: GetByIdParams) {
    return this.labelsService.directorService.delete(params.id);
  }
}
