import { FilmsService } from './films.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { FilmsController } from './films.controller';
import { LabelsModule } from '../labels/labels.module';

import { Film } from '../entities/film.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film]), LabelsModule],
  providers: [FilmsService],
  controllers: [FilmsController]
})
export class FilmsModule {}
