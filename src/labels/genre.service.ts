import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LabelDTO } from './dto/label.dto';
import { Genre } from '../entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>
  ) {}

  public getAll() {
    return this.genreRepository.find();
  }

  public async getById(id: number) {
    const country = await this.genreRepository.findOne(id);

    if (!country) {
      throw new HttpException('Genre not found!', HttpStatus.NOT_FOUND);
    }

    return country;
  }

  public async getBySlug(slug: string) {
    const country = await this.genreRepository.findOne({ where: { slug } });

    if (!country) {
      throw new HttpException('Genre not found!', HttpStatus.NOT_FOUND);
    }

    return country;
  }

  public add(data: LabelDTO) {
    const genre = new Genre();

    genre.label = data.label;
    genre.slug = data.slug;

    return this.genreRepository.save(genre);
  }

  public async delete(id: number) {
    const genre = await this.genreRepository.findOne(id);

    if (!genre) {
      throw new HttpException('Genre not found!', HttpStatus.NOT_FOUND);
    }

    return this.genreRepository.remove(genre);
  }
}
