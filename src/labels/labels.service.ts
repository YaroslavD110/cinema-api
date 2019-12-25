import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LabelDTO } from './dto/label.dto';
import { DirectorDTO } from './dto/director.dto';

import { Genre } from '../entities/genre.entity';
import { Country } from '../entities/country.entity';
import { Director } from '../entities/director.entity';

type LabelNamesType = 'genre' | 'country' | 'director';
type LabelsType = Genre | Country | Director;
type LabelsDTOType = LabelDTO | DirectorDTO;

interface ILabel {
  createEntity: (data: LabelsDTOType) => LabelsType;
  repository: Repository<LabelsType>;
}

@Injectable()
export class LabelsService {
  private readonly labelsEnum: Record<LabelNamesType, ILabel> = {
    genre: {
      createEntity: this.createGenreEntity,
      repository: this.genreRepository
    },
    country: {
      createEntity: this.createCountryEntity,
      repository: this.countryRepository
    },
    director: {
      createEntity: this.createDirectorEntity,
      repository: this.directorRepository
    }
  };

  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>
  ) {}

  private createGenreEntity(data: LabelDTO) {
    const genre = new Genre();

    genre.label = data.label;
    genre.slug = data.slug;

    return genre;
  }

  private createCountryEntity(data: LabelDTO) {
    const country = new Country();

    country.label = data.label;
    country.slug = data.slug;

    return country;
  }

  private createDirectorEntity(data: DirectorDTO) {
    const director = new Director();

    director.name = data.name;
    director.slug = data.slug;

    return director;
  }

  public getAll(labelName: LabelNamesType) {
    const { repository } = this.labelsEnum[labelName];

    return repository.find();
  }

  public getById(labelName: LabelNamesType) {
    const { repository } = this.labelsEnum[labelName];

    return function(id: string) {
      return repository.findOne(id);
    };
  }

  public getBySlug(labelName: LabelNamesType) {
    const { repository } = this.labelsEnum[labelName];

    return function(slug: string) {
      return repository.findOne({ slug });
    };
  }

  public addLabel(labelName: LabelNamesType) {
    const { repository, createEntity } = this.labelsEnum[labelName];

    return function(data: LabelsDTOType) {
      const entity = createEntity(data);

      return repository.save(entity);
    };
  }
}
