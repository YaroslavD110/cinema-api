import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Genre } from '../entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>
  ) {}

  getAll() {
    return this.genreRepository.find();
  }

  getById(id: string) {
    return this.genreRepository.findOne(id);
  }

  getBySlug(slug: string) {
    return this.genreRepository.findOne({ slug });
  }
}
