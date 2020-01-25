import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { FilmsService } from './film.service';
import { FilmsController } from './film.controller';

import { Film } from '../../entities/film.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film])],
  providers: [FilmsService],
  controllers: [FilmsController]
})
export class FilmsModule {}
