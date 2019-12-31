import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { DirectorService } from './director.service';
import { GenreService } from './genre.service';
import { CountryService } from './country.service';
import { LabelsService } from './labels.service';
import { LabelsController } from './labels.controller';

import { Genre } from '../entities/genre.entity';
import { Country } from '../entities/country.entity';
import { Director } from '../entities/director.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Genre, Country, Director])],
  providers: [LabelsService, CountryService, GenreService, DirectorService],
  controllers: [LabelsController],
  exports: [LabelsService]
})
export class LabelsModule {}
