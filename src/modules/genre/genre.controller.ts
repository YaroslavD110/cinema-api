import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GenreService } from './genre.service';
import { CRUDController } from './../../shared/crud/crud.controller';

@ApiTags('Genres')
@Controller('genre')
export class GenreController extends CRUDController {
  constructor(private readonly genreService: GenreService) {
    super(genreService);
  }
}
