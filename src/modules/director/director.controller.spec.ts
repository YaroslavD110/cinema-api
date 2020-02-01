import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { Director } from './../../entities/director.entity';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';

const directorRepository = jest.fn(() => ({}));

describe('Director Controller', () => {
  let controller: DirectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DirectorService,
        {
          provide: getRepositoryToken(Director),
          useFactory: directorRepository
        }
      ],
      controllers: [DirectorController]
    }).compile();

    controller = module.get<DirectorController>(DirectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
