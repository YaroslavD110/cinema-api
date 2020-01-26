import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { Genre } from './../../entities/genre.entity';
import { Actor } from '../../entities/actor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Actor, Genre])],
  providers: [ActorService],
  controllers: [ActorController]
})
export class ActorModule {}
