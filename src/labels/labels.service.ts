import { Injectable } from '@nestjs/common';

import { DirectorService } from './director.service';
import { GenreService } from './genre.service';
import { CountryService } from './country.service';

@Injectable()
export class LabelsService {
  constructor(
    public readonly countryService: CountryService,
    public readonly genreService: GenreService,
    public readonly directorService: DirectorService
  ) {}
}
