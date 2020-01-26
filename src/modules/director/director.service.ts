import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Director } from './../../entities/director.entity';
import { CRUDService } from './../../shared/crud/crud.service';
import { DirectorDTO } from './dto/director.dto';

@Injectable()
export class DirectorService extends CRUDService<DirectorDTO> {
  constructor(
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>
  ) {
    super({ entityRepository: directorRepository, Entity: Director });
  }
}
