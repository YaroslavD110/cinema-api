import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { APIService, IFilmDataResponse } from './APIs.service';

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
    private readonly apiService: APIService,
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

  private async updateFilm(film: Film) {
    let filmData: IFilmDataResponse | null;
    if (film.IMDBid) {
      filmData = await this.apiService.getFilmData({ IMDBid: film.IMDBid });
    } else {
      filmData = await this.apiService.getFilmData({ title: film.title });
    }

    if (!filmData) {
      return null;
    }

    const filmKeys = Object.keys(film);
    for (let key in filmData) {
      if (filmKeys.includes(key) && filmData[key]) {
        film[key] = filmData[key];
      }
    }

    return await this.filmsRepository.save(film);
  }

  public async updateDataAboutFilm(id: number): Promise<Film> {
    const film = await this.filmsRepository.findOne(id);

    if (!film) {
      return null;
    }

    return await this.updateFilm(film);
  }

  private async setMetaForFilm(film: Film) {
    this.filmsRepository.increment({ id: film.id }, 'viewsNumber', 1);

    if (!film.IMDBid || film.updatedAt.getTime() < new Date().setMonth(-1)) {
      return await this.updateFilm(film);
    }

    return film;
  }

  public async getBySlug(slug: string) {
    const film = await this.filmsRepository.findOne({
      where: { slug },
      relations: ['genres', 'countries', 'directors', 'actors']
    });

    if (!film) {
      return null;
    }

    const updatedFilmData = await this.setMetaForFilm(film);

    return {
      ...film.toResponseObject(),
      ...updatedFilmData.toResponseObject()
    };
  }

  public async getById(id: number) {
    const film = await this.filmsRepository.findOne(id, {
      relations: allFilmRelations
    });

    if (!film) {
      return null;
    }

    const updatedFilmData = await this.setMetaForFilm(film);

    return {
      ...film.toResponseObject(),
      ...updatedFilmData.toResponseObject()
    };
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
