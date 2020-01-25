import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Genre } from './../../entities/genre.entity';
import { CRUDService } from './../../shared/crud/crud.service';

@Injectable()
export class GenreService extends CRUDService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>
  ) {
    super(genreRepository, Genre);
  }
}
