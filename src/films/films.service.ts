import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { LabelsService } from '../labels/labels.service';
import { FilmDTO } from './dto/film.dto';
import { Film } from '../entities/film.entity';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private readonly filmsRepository: Repository<Film>,
    private readonly labelsService: LabelsService
  ) {}

  public getFilms() {
    return this.filmsRepository.find({
      relations: ['genres', 'countries', 'directors']
    });
  }

  public getFilmById(id: number) {
    return this.filmsRepository.findOne(id, {
      relations: ['genres', 'countries', 'directors']
    });
  }

  public async addFilm(data: FilmDTO) {
    const { genres, countries, directors, ...restData } = data;

    let film = new Film();

    film = { ...film, ...restData };
    film.genres = [];
    film.countries = [];
    film.directors = [];

    for (let genreId of genres) {
      const filmGenre = await this.labelsService.genreService.getById(genreId);

      film.genres.push(filmGenre);
    }

    for (let countryId of countries) {
      const filmCountry = await this.labelsService.countryService.getById(
        countryId
      );

      film.countries.push(filmCountry);
    }

    for (let directorId of directors) {
      const filmDirector = await this.labelsService.directorService.getById(
        directorId
      );

      film.directors.push(filmDirector);
    }

    return this.filmsRepository.save(film);
  }
}
