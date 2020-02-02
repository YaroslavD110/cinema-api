import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Director } from './../../entities/director.entity';
import { Image } from './../../entities/image.entity';
import { CRUDService } from './../../shared/crud/crud.service';
import { DirectorDTO } from './dto/director.dto';
import { plainToClass } from 'class-transformer';
import { createImageEntity } from './../../shared/utils/files.util';

@Injectable()
export class DirectorService extends CRUDService<DirectorDTO> {
  constructor(
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>
  ) {
    super({
      entityRepository: directorRepository,
      Entity: Director,
      relations: ['posterImg']
    });
  }

  public async add(data: DirectorDTO) {
    const actor = plainToClass(Director, data);

    if (data.posterImg) {
      const image = createImageEntity(data.posterImg);

      actor.posterImg = image;
      await this.imageRepository.save(image);
    }

    return this.directorRepository.save(actor);
  }
}
