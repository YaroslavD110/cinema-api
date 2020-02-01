import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Genre } from './../../entities/genre.entity';
import { Actor } from './../../entities/actor.entity';
import { ActorController } from './actor.controller';
import { ActorService } from './actor.service';

const actorRepository = jest.fn(() => ({}));
const genreRepository = jest.fn(() => ({}));

describe('Actor Controller', () => {
  let controller: ActorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActorService,
        {
          provide: getRepositoryToken(Actor),
          useFactory: actorRepository
        },
        {
          provide: getRepositoryToken(Genre),
          useClass: genreRepository
        }
      ],
      controllers: [ActorController]
    }).compile();

    controller = module.get<ActorController>(ActorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
