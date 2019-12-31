import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DirectorDTO } from './dto/director.dto';
import { Director } from '../entities/director.entity';

@Injectable()
export class DirectorService {
  constructor(
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>
  ) {}

  public getAll() {
    return this.directorRepository.find();
  }

  public async getById(id: number) {
    const director = await this.directorRepository.findOne(id);

    if (!director) {
      throw new HttpException('Director not found!', HttpStatus.NOT_FOUND);
    }

    return director;
  }

  public async getBySlug(slug: string) {
    const director = await this.directorRepository.findOne({ where: { slug } });

    if (!director) {
      throw new HttpException('Director not found!', HttpStatus.NOT_FOUND);
    }

    return director;
  }

  public add(data: DirectorDTO) {
    const director = new Director();

    director.name = data.name;
    director.slug = data.slug;

    return this.directorRepository.save(director);
  }

  public async delete(id: number) {
    const director = await this.directorRepository.findOne(id);

    if (!director) {
      throw new HttpException('Director not found!', HttpStatus.NOT_FOUND);
    }

    return this.directorRepository.remove(director);
  }
}
