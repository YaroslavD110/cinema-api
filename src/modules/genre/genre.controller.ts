import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GenreService } from './genre.service';
import { CRUDController } from './../../shared/crud/crud.controller';
import { GenreDTO } from './dto/genre.dto';

@ApiTags('Genres')
@Controller('genre')
export class GenreController extends CRUDController<GenreDTO> {
  constructor(private readonly genreService: GenreService) {
    super(genreService);
  }
}
