import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LabelDTO } from './dto/label.dto';
import { Country } from '../entities/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>
  ) {}

  public getAll() {
    return this.countryRepository.find();
  }

  public async getById(id: number) {
    const country = await this.countryRepository.findOne(id);

    if (!country) {
      throw new HttpException('Country not found!', HttpStatus.NOT_FOUND);
    }

    return country;
  }

  public async getBySlug(slug: string) {
    const country = await this.countryRepository.findOne({ where: { slug } });

    if (!country) {
      throw new HttpException('Country not found!', HttpStatus.NOT_FOUND);
    }

    return country;
  }

  public add(data: LabelDTO) {
    const country = new Country();

    country.label = data.label;
    country.slug = data.slug;

    return this.countryRepository.save(country);
  }

  public async delete(id: number) {
    const country = await this.countryRepository.findOne(id);

    if (!country) {
      throw new HttpException('Country not found!', HttpStatus.NOT_FOUND);
    }

    return this.countryRepository.remove(country);
  }
}
