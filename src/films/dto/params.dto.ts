import { IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { parseIntTransform } from '../../shared/data.transform';

export class FilmQueryDTO {
  @IsInt()
  @IsOptional()
  @Transform(parseIntTransform)
  limit: number = 10;

  @IsInt()
  @IsOptional()
  @Transform(parseIntTransform)
  offset: number = 0;
}
