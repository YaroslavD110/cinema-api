import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Director } from './../../entities/director.entity';
import { CRUDService } from './../../shared/crud/crud.service';

@Injectable()
export class DirectorService extends CRUDService {
  constructor(
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>
  ) {
    super(directorRepository, Director);
  }
}
