import { plainToClass } from 'class-transformer';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { readFile, statSync } from 'fs';
import { promisify } from 'util';
import { resolve, extname } from 'path';

import { createImageEntity } from './../shared/utils/files.util';
import { Film } from './../entities/film.entity';
import { Genre } from './../entities/genre.entity';
import { Image } from './../entities/image.entity';
import { Actor } from './../entities/actor.entity';
import { Director } from './../entities/director.entity';
import { Country } from './../entities/country.entity';

export class FillData1580639350533 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const dataBuffer = await promisify(readFile)(
      resolve(__dirname, '../../filmsDB.json')
    );
    const data = JSON.parse(dataBuffer.toString());

    const createdGenres = await queryRunner.manager
      .getRepository<Genre>(Genre)
      .save(
        plainToClass(
          Genre,
          data.genres.map(({ label, slug }) => ({ label, slug }))
        )
      );

    const createdCountries = await queryRunner.manager
      .getRepository<Country>(Country)
      .save(
        plainToClass(
          Country,
          data.countries.map(({ label, slug }) => ({ name: label, slug }))
        )
      );

    const createdImages = await queryRunner.manager
      .getRepository<Image>(Image)
      .save(
        data.images.map(name => {
          if (!name) return null;

          const ext = extname(name).replace('.', '');
          const data = statSync(
            resolve(__dirname, `../../static/images/${name}`)
          );

          if (data) {
            return createImageEntity({
              filename: name,
              size: data.size,
              mimetype: `image/${ext}`
            });
          }
        })
      );

    const createdDirectors = await queryRunner.manager
      .getRepository<Director>(Director)
      .save(
        plainToClass(
          Director,
          data.directors.map(
            ({
              name,
              slug,
              eng_name,
              poster_img_name,
              birth_place,
              birth
            }) => ({
              name,
              slug,
              engName: eng_name,
              posterImg:
                typeof poster_img_name === 'number'
                  ? createdImages[poster_img_name]
                  : null,
              birthPlace: birth_place,
              birthDate: birth ? new Date(birth) : null
            })
          )
        )
      );

    const createdActors = await queryRunner.manager
      .getRepository<Actor>(Actor)
      .save(
        plainToClass(
          Actor,
          data.actors.map(
            ({
              name,
              slug,
              eng_name,
              poster_img_name,
              birth_place,
              birth,
              genres
            }) => ({
              name,
              slug,
              engName: eng_name,
              posterImg:
                typeof poster_img_name === 'number'
                  ? createdImages[poster_img_name]
                  : null,
              birthPlace: birth_place,
              birthDate: birth ? new Date(birth) : null,
              films: [],
              genres: genres ? genres.map(index => createdGenres[index]) : null
            })
          )
        )
      );

    await queryRunner.manager.getRepository<Film>(Film).save(
      plainToClass(
        Film,
        data.films
          .filter(
            ({ genres, countries, directors, actors }) =>
              genres.length &&
              countries.length &&
              directors.length &&
              actors.length
          )
          .map(
            ({
              title,
              eng_title,
              slug,
              year,
              description,
              poster,
              screenshots,
              genres,
              countries,
              directors,
              actors
            }) => ({
              title,
              slug,
              engTitle: eng_title,
              year,
              description,
              posterImg: createdImages[poster],
              screenshots: screenshots.map(index => createdImages[index]),
              genres: genres.map(index => createdGenres[index]),
              countries: countries.map(index => createdCountries[index]),
              directors: directors.map(index => createdDirectors[index]),
              actors: actors.map(index => createdActors[index])
            })
          )
      )
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
