import { GenresService } from './genres.service';
import { Controller, Put } from '@nestjs/common';

@Controller()
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Put('/genres')
  addGenre() {
    return this.genresService.addGenre();
  }
}
