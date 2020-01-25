import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LabelsService } from '../labels/labels.service';
import { Film } from '../../entities/film.entity';
import { FilmDTO } from './dto/film.dto';
import { FilmQueryDTO } from './dto/params.dto';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private readonly filmsRepository: Repository<Film>,
    private readonly labelsService: LabelsService
  ) {}

  // public getFilms(params: FilmQueryDTO) {
  //   return this.filmsRepository.find({
  //     take: params.limit,
  //     skip: params.offset,
  //     select: ['id', 'title', 'slug', 'IMDBRating', 'posterUrl'],
  //     relations: ['genres']
  //   });
  // }

  // public countFilms() {
  //   return this.filmsRepository.count();
  // }

  // public async getFilmBySlug(slug: string) {
  //   const film = await this.filmsRepository.findOne({
  //     where: { slug },
  //     relations: ['genres', 'countries', 'directors']
  //   });

  //   if (!film) {
  //     throw new HttpException('Film not found!', HttpStatus.NOT_FOUND);
  //   }

  //   this.filmsRepository.increment({ id: film.id }, 'viewsNumber', 1);

  //   return film;
  // }

  // public async getFilmById(id: number) {
  //   const film = await this.filmsRepository.findOne(id, {
  //     relations: ['genres', 'countries', 'directors']
  //   });

  //   if (!film) {
  //     throw new HttpException('Film not found!', HttpStatus.NOT_FOUND);
  //   }

  //   this.filmsRepository.increment({ id: film.id }, 'viewsNumber', 1);

  //   return film;
  // }

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
