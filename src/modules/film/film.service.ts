import { plainToClass } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { createImageEntity } from './../../shared/utils/files.util';
import { CRUDService } from './../../shared/crud/crud.service';
import { FilmDTO } from './dto/film.dto';
import { FilmQueryDTO } from './dto/params.dto';
import { Film } from '../../entities/film.entity';
import { Director } from './../../entities/director.entity';
import { Country } from './../../entities/country.entity';
import { Actor } from './../../entities/actor.entity';
import { Genre } from './../../entities/genre.entity';
import { Image } from './../../entities/image.entity';

const allFilmRelations = [
  'genres',
  'countries',
  'directors',
  'actors',
  'posterImg',
  'screenshots'
];

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
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>
  ) {
    super({
      entityRepository: filmsRepository,
      Entity: Film,
      relations: allFilmRelations
    });
  }

  public async getAllFilms(params: FilmQueryDTO) {
    const films = await this.filmsRepository.find({
      take: params.limit,
      skip: params.offset,
      relations: allFilmRelations
    });

    return films.map(film => film.toResponseObject());
  }

  public async getMinimizedFilms(params: FilmQueryDTO) {
    const films = await this.filmsRepository.find({
      take: params.limit,
      skip: params.offset,
      select: ['id', 'title', 'slug', 'posterImg'],
      relations: ['genres', 'posterImg']
    });

    return films.map(film => film.toResponseObject());
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

    return film.toResponseObject();
  }

  public async getById(id: number) {
    const film = await this.filmsRepository.findOne(id, {
      relations: allFilmRelations
    });

    if (!film) {
      return null;
    }

    this.filmsRepository.increment({ id: film.id }, 'viewsNumber', 1);

    return film.toResponseObject();
  }

  public async add(data: FilmDTO) {
    const images: Image[] = [];
    const film = plainToClass(Film, data);

    if (data.posterImg) {
      const image = createImageEntity(data.posterImg);

      film.posterImg = image;
      images.push(image);
    }

    if (Array.isArray(data.screenshots) && data.screenshots.length) {
      film.screenshots = [];

      for (let screenshotData of data.screenshots) {
        const image = createImageEntity(screenshotData);

        film.screenshots.push(image);
        images.push(image);
      }
    }

    if (images.length) {
      await this.imageRepository.save(images);
    }

    film.actors = await this.actorRepository.findByIds(film.actors);
    film.directors = await this.directorRepository.findByIds(film.directors);
    film.countries = await this.countryRepository.findByIds(film.countries);
    film.genres = await this.genreRepository.findByIds(film.genres);

    return this.filmsRepository.save(film);
  }
}
