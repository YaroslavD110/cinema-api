import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { Actor } from '../../entities/actor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Actor])],
  providers: [ActorService],
  controllers: [ActorController]
})
export class ActorModule {}
