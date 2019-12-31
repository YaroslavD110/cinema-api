import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({ maxLength: 254 })
  title: string;

  @MaxLength(254)
  @IsNotEmpty()
  @ApiProperty({ maxLength: 254 })
  slug: string;

  @MaxLength(254)
  @IsOptional()
  @ApiPropertyOptional({ maxLength: 254 })
  subtitle?: string;

  @MaxLength(254)
  @IsOptional()
  @ApiPropertyOptional({ maxLength: 254 })
  posterUrl?: string;

  @MaxLength(254)
  @IsOptional()
  @ApiPropertyOptional({ maxLength: 254 })
  videoFrameUrl?: string;

  @MaxLength(2500)
  @IsNotEmpty()
  @ApiProperty({ maxLength: 2500 })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(10)
  @Transform(parseFloatTransform)
  @ApiProperty({ minimum: 0, maximum: 10 })
  IMDBRating: number;

  @IsNotEmpty()
  @IsInt()
  @Transform(parseIntTransform)
  @ApiProperty()
  year: number;

  @IsInt({ each: true })
  @ArrayNotEmpty()
  @Transform(parseIntArrayTransform)
  @ApiProperty({ type: [Number] })
  genres: number[];

  @IsInt({ each: true })
  @ArrayNotEmpty()
  @Transform(parseIntArrayTransform)
  @ApiProperty({ type: [Number] })
  directors: number[];

  @IsInt({ each: true })
  @ArrayNotEmpty()
  @Transform(parseIntArrayTransform)
  @ApiProperty({ type: [Number] })
  countries: number[];
}
