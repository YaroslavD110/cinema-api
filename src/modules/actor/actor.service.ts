import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CRUDService } from '../../shared/crud/crud.service';
import { Genre } from './../../entities/genre.entity';
import { Actor } from '../../entities/actor.entity';
import { Image } from '../../entities/image.entity';
import { ActorDTO } from './dto/actor.dto';
import { createImageEntity } from '../../shared/utils/files.util';

@Injectable()
export class ActorService extends CRUDService<ActorDTO> {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>
  ) {
    super({
      entityRepository: actorRepository,
      Entity: Actor,
      relations: ['posterImg']
    });
  }

  public async add(data: ActorDTO) {
    const actor = plainToClass(Actor, data);

    if (data.posterImg) {
      const image = createImageEntity(data.posterImg);

      actor.posterImg = image;
      await this.imageRepository.save(image);
    }

    if (actor.genres.length) {
      actor.genres = await this.genreRepository.findByIds(actor.genres);
    }

    return this.actorRepository.save(actor);
  }
}
