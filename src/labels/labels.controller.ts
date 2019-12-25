import { LabelsService } from './labels.service';
import { Controller, Get, Put } from '@nestjs/common';

@Controller()
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Get('/genres')
  getGenres() {
    return this.labelsService.getAll('genre');
  }

  @Get('/countries')
  getCountries() {
    return this.labelsService.getAll('country');
  }

  @Get('/directors')
  getDirectors() {
    return this.labelsService.getAll('director');
  }
}
