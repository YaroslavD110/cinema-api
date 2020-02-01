import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Genre } from './../../entities/genre.entity';
import { Actor } from './../../entities/actor.entity';
import { ActorService } from './actor.service';

const actorRepository = jest.fn(() => ({}));
const genreRepository = jest.fn(() => ({}));

describe('ActorService', () => {
  let service: ActorService;

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
      ]
    }).compile();

    service = module.get<ActorService>(ActorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
