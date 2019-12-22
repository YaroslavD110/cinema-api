import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';

import { Genre } from '../entities/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  providers: [GenresService],
  controllers: [GenresController],
  exports: [GenresService]
})
export class GenresModule {}
