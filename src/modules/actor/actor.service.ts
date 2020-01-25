import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { CRUDService } from '../../shared/crud/crud.service';
import { Actor } from '../../entities/actor.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ActorService extends CRUDService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>
  ) {
    super(actorRepository, Actor);
  }
}
