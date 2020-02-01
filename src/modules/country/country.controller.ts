import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

import { CountryDTO } from './dto/country.dto';
import { CountryService } from './country.service';
import { CRUDController } from './../../shared/crud/crud.controller';

@ApiTags('Countries')
@Controller('country')
export class CountryController extends CRUDController<CountryDTO> {
  constructor(public readonly countryService: CountryService) {
    super(countryService);
  }
}
