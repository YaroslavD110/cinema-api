import { Transform } from 'class-transformer';
import {
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsNumber,
  Min,
  Max,
  ArrayNotEmpty
} from 'class-validator';

import {
  parseFloatTransform,
  parseIntTransform,
  parseIntArrayTransform
} from '../../shared/data.transform';

export class FilmDTO {
  @MaxLength(254)
  @IsNotEmpty()
  title: string;

  @MaxLength(254)
  @IsNotEmpty()
  slug: string;

  @MaxLength(254)
  @IsOptional()
  subtitle?: string;

  @MaxLength(254)
  @IsOptional()
  posterUrl?: string;

  @MaxLength(254)
  @IsOptional()
  videoFrameUrl?: string;

  @MaxLength(2500)
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(10)
  @Transform(parseFloatTransform)
  IMDBRating: number;

  @IsNotEmpty()
  @IsInt()
  @Transform(parseIntTransform)
  year: number;

  @IsInt({ each: true })
  @ArrayNotEmpty()
  @Transform(parseIntArrayTransform)
  genres: number[];

  @IsInt({ each: true })
  @ArrayNotEmpty()
  @Transform(parseIntArrayTransform)
  directors: number[];

  @IsInt({ each: true })
  @ArrayNotEmpty()
  @Transform(parseIntArrayTransform)
  countries: number[];
}
