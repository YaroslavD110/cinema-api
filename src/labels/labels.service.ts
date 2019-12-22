import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Genre } from '../entities/genre.entity';
import { Country } from '../entities/country.entity';
import { Director } from '../entities/director.entity';

type LabelNamesType = 'genre' | 'country' | 'director';
interface ILabel {
  name: LabelNamesType;
  repository: Repository<Genre | Director | Country>;
}

@Injectable()
export class LabelsService {
  private readonly labelsEnum: ILabel[] = [
    {
      name: 'genre',
      repository: this.genreRepository
    },
    {
      name: 'country',
      repository: this.countryRepository
    },
    {
      name: 'director',
      repository: this.directorRepository
    }
  ];

  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>
  ) {}

  getAll(labelName: LabelNamesType) {
    const { repository } = this.labelsEnum.find(
      ({ name }) => name === labelName
    );

    return repository.find();
  }

  getById(labelName: LabelNamesType) {
    const { repository } = this.labelsEnum.find(
      ({ name }) => name === labelName
    );

    return function(id: string) {
      return repository.findOne(id);
    };
  }

  getBySlug(labelName: LabelNamesType) {
    const { repository } = this.labelsEnum.find(
      ({ name }) => name === labelName
    );

    return function(slug: string) {
      return repository.findOne({ slug });
    };
  }
}
