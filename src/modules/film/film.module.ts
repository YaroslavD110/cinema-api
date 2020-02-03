import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { APIService } from './APIs.service';
import { FilmsService } from './film.service';
import { FilmsController } from './film.controller';

import { Image } from './../../entities/image.entity';
import { Film } from '../../entities/film.entity';
import { Director } from './../../entities/director.entity';
import { Country } from './../../entities/country.entity';
import { Actor } from './../../entities/actor.entity';
import { Genre } from './../../entities/genre.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Film, Genre, Actor, Country, Director, Image])
  ],
  providers: [FilmsService, APIService],
  controllers: [FilmsController]
})
export class FilmsModule {}
