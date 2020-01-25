import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Country } from './../../entities/country.entity';
import { CRUDService } from './../../shared/crud/crud.service';

@Injectable()
export class CountryService extends CRUDService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>
  ) {
    super(countryRepository, Country);
  }
}
