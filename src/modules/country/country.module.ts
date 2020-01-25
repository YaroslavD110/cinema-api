import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Country } from './../../entities/country.entity';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  providers: [CountryService],
  controllers: [CountryController]
})
export class CountryModule {}
