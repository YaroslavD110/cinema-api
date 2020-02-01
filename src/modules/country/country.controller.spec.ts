import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { Country } from '../../entities/country.entity';

const countryRepository = jest.fn(() => ({}));

describe('Country Controller', () => {
  let controller: CountryController;
  let service: CountryService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CountryService,
        {
          provide: getRepositoryToken(Country),
          useFactory: countryRepository
        }
      ],
      controllers: [CountryController]
    }).compile();

    controller = module.get<CountryController>(CountryController);
    service = module.get<CountryService>(CountryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should call add service method', async () => {
    jest.spyOn(service, 'add').mockImplementation();

    await controller.add({
      label: 'some',
      slug: 'some'
    });

    expect(service.add).toHaveBeenCalled();
  });
});
