import { plainToClass } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CRUDService } from './../../shared/crud/crud.service';
import { FilmDTO } from './dto/film.dto';
import { FilmQueryDTO } from './dto/params.dto';
import { Film } from '../../entities/film.entity';
import { Director } from './../../entities/director.entity';
import { Country } from './../../entities/country.entity';
import { Actor } from './../../entities/actor.entity';
import { Genre } from './../../entities/genre.entity';

@Injectable()
export class FilmsService extends CRUDService<FilmDTO> {
  constructor(
    @InjectRepository(Film)
    private readonly filmsRepository: Repository<Film>,
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>
  ) {
    super({
      entityRepository: filmsRepository,
      Entity: Film
    });
  }

  public getFilms(params: FilmQueryDTO) {
    return this.filmsRepository.find({
      take: params.limit,
      skip: params.offset,
      select: ['id', 'title', 'slug', 'posterImgName'],
      relations: ['genres']
    });
  }

  public countFilms() {
    return this.filmsRepository.count();
  }

  public async getBySlug(slug: string) {
    const film = await this.filmsRepository.findOne({
      where: { slug },
      relations: ['genres', 'countries', 'directors', 'actors']
    });

    if (!film) {
      return null;
    }

    this.filmsRepository.increment({ id: film.id }, 'viewsNumber', 1);

    return film;
  }

  public async getById(id: number) {
    const film = await this.filmsRepository.findOne(id, {
      relations: ['genres', 'countries', 'directors', 'actors']
    });

    if (!film) {
      return null;
    }

    this.filmsRepository.increment({ id: film.id }, 'viewsNumber', 1);

    return film;
  }

  public async add(data: FilmDTO) {
    const film = plainToClass(Film, data);

    film.actors = await this.actorRepository.findByIds(film.actors);
    film.directors = await this.directorRepository.findByIds(film.directors);
    film.countries = await this.countryRepository.findByIds(film.countries);
    film.genres = await this.genreRepository.findByIds(film.genres);

    return this.filmsRepository.save(film);
  }
}
