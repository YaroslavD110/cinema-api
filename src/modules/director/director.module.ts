import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Image } from './../../entities/image.entity';
import { Director } from './../../entities/director.entity';
import { DirectorController } from './director.controller';
import { DirectorService } from './director.service';

@Module({
  imports: [TypeOrmModule.forFeature([Director, Image])],
  controllers: [DirectorController],
  providers: [DirectorService]
})
export class DirectorModule {}
