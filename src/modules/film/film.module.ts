import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { FilmsService } from './film.service';
import { FilmsController } from './film.controller';

import { Film } from '../../entities/film.entity';
import { Director } from './../../entities/director.entity';
import { Country } from './../../entities/country.entity';
import { Actor } from './../../entities/actor.entity';
import { Genre } from './../../entities/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Genre, Actor, Country, Director])],
  providers: [FilmsService],
  controllers: [FilmsController]
})
export class FilmsModule {}
