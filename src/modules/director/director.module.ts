import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Director } from './../../entities/director.entity';
import { DirectorController } from './director.controller';
import { DirectorService } from './director.service';

@Module({
  imports: [TypeOrmModule.forFeature([Director])],
  controllers: [DirectorController],
  providers: [DirectorService]
})
export class DirectorModule {}
