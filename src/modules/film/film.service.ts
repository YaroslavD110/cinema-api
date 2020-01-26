import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CRUDService } from './../../shared/crud/crud.service';
import { Film } from '../../entities/film.entity';
import { FilmDTO } from './dto/film.dto';
import { FilmQueryDTO } from './dto/params.dto';

@Injectable()
export class FilmsService extends CRUDService<FilmDTO> {
  constructor(
    @InjectRepository(Film)
    private readonly filmsRepository: Repository<Film>
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

  // public async addFilm(data: FilmDTO) {
  //   const { genres, countries, directors, ...restData } = data;

  //   let film = new Film();

  //   film = { ...film, ...restData };
  //   film.genres = [];
  //   film.countries = [];
  //   film.directors = [];

  //   for (let genreId of genres) {
  //     const filmGenre = await this.labelsService.genreService.getById(genreId);

  //     film.genres.push(filmGenre);
  //   }

  //   for (let countryId of countries) {
  //     const filmCountry = await this.labelsService.countryService.getById(
  //       countryId
  //     );

  //     film.countries.push(filmCountry);
  //   }

  //   for (let directorId of directors) {
  //     const filmDirector = await this.labelsService.directorService.getById(
  //       directorId
  //     );

  //     film.directors.push(filmDirector);
  //   }

  //   return this.filmsRepository.save(film);
  // }
}
