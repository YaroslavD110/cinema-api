import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { LabelsModule } from '../labels/labels.module';

import { Film } from '../entities/film.entity';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private readonly filmsRepository: Repository<Film>
  ) {}

  async getFilms() {
    return this.filmsRepository.find({ relations: ['genres'] });
  }
}
