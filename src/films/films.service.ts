import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { GenresService } from '../genres/genres.service';

import { Film } from '../entities/film.entity';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private readonly filmsRepository: Repository<Film>,
    private readonly genresService: GenresService
  ) {}

  async addFilm() {
    const film = new Film();

    film.title = 'Звёздные войны: Скайуокер. Восход';
    film.subtitle = 'Star Wars: Episode IX - The Rise of Skywalker';
    film.slug = 'some';
    film.description =
      'Фильм завершает невероятную историю семьи Скайуокеров, длящуюся уже более сорока лет, и обещает дать ответы на все загадки из предыдущих серий. Зрителя ожидают старые и новые герои, уникальные миры, увлекательные путешествия на край Галактики и грандиозный финал фантастической саги.';
    film.IMDBRating = 7;
    film.year = 2019;

    const genre = await this.genresService.getById('1');
    film.genres = [genre];

    await this.filmsRepository.save(film);

    return film;
  }

  async getFilms() {
    return this.filmsRepository.find({ relations: ['genres'] });
  }
}
