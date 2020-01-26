import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CRUDService } from '../../shared/crud/crud.service';
import { Genre } from './../../entities/genre.entity';
import { Actor } from '../../entities/actor.entity';
import { ActorDTO } from './dto/actor.dto';

@Injectable()
export class ActorService extends CRUDService<ActorDTO> {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>
  ) {
    super({
      entityRepository: actorRepository,
      Entity: Actor
    });
  }

  public async add(data: ActorDTO) {
    const actor = plainToClass(Actor, data);

    if (actor.genres.length) {
      actor.genres = await this.genreRepository.findByIds(actor.genres);
    }

    return this.actorRepository.save(actor);
  }
}
