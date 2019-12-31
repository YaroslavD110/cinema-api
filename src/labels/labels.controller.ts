import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { LabelsService } from './labels.service';
import { GetByIdParams, GetBySlugParams } from '../shared/dto/params.dto';
import { DirectorDTO } from './dto/director.dto';
import { LabelDTO } from './dto/label.dto';

@Controller()
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Get('/country')
  @ApiTags('Country')
  getCountries() {
    return this.labelsService.countryService.getAll();
  }

  @Get('/country/:id')
  @ApiTags('Country')
  getCountryById(@Param() params: GetByIdParams) {
    return this.labelsService.countryService.getById(params.id);
  }

  @Get('/country/slug/:slug')
  @ApiTags('Country')
  getCountryBySlug(@Param() params: GetBySlugParams) {
    return this.labelsService.countryService.getBySlug(params.slug);
  }

  @Post('/country')
  @ApiTags('Country')
  addCountry(@Body() data: LabelDTO) {
    return this.labelsService.countryService.add(data);
  }

  @Delete('/country/:id')
  @ApiTags('Country')
  deleteCountry(@Param() params: GetByIdParams) {
    return this.labelsService.countryService.delete(params.id);
  }

  @Get('/genre')
  @ApiTags('Genre')
  getGenres() {
    return this.labelsService.genreService.getAll();
  }

  @Get('/genre/:id')
  @ApiTags('Genre')
  getGenreById(@Param() params: GetByIdParams) {
    return this.labelsService.genreService.getById(params.id);
  }

  @Get('/genre/slug/:slug')
  @ApiTags('Genre')
  getGenreBySlug(@Param() params: GetBySlugParams) {
    return this.labelsService.genreService.getBySlug(params.slug);
  }

  @Post('/genre')
  @ApiTags('Genre')
  addGenre(@Body() data: LabelDTO) {
    return this.labelsService.genreService.add(data);
  }

  @Delete('/genre/:id')
  @ApiTags('Genre')
  deleteGenre(@Param() params: GetByIdParams) {
    return this.labelsService.genreService.delete(params.id);
  }

  @Get('/director')
  @ApiTags('Director')
  getDirectors() {
    return this.labelsService.directorService.getAll();
  }

  @Get('/director/:id')
  @ApiTags('Director')
  getDirectorById(@Param() params: GetByIdParams) {
    return this.labelsService.directorService.getById(params.id);
  }

  @Get('/director/slug/:slug')
  @ApiTags('Director')
  getDirectorBySlug(@Param() params: GetBySlugParams) {
    return this.labelsService.directorService.getBySlug(params.slug);
  }

  @Post('/director')
  @ApiTags('Director')
  addDirector(@Body() data: DirectorDTO) {
    return this.labelsService.directorService.add(data);
  }

  @Delete('/director/:id')
  @ApiTags('Director')
  deleteDirector(@Param() params: GetByIdParams) {
    return this.labelsService.directorService.delete(params.id);
  }
}
