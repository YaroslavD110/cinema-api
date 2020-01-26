import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Genre } from './../../entities/genre.entity';
import { CRUDService } from './../../shared/crud/crud.service';
import { GenreDTO } from './dto/genre.dto';

@Injectable()
export class GenreService extends CRUDService<GenreDTO> {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>
  ) {
    super({
      entityRepository: genreRepository,
      Entity: Genre
    });
  }
}
