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
} from '../../../shared/data.transform';

export class FilmDTO {
  @MaxLength(255)
  @IsNotEmpty()
  @ApiProperty({ maxLength: 255 })
  title: string;

  @MaxLength(255)
  @IsNotEmpty()
  @ApiProperty({ maxLength: 255 })
  slug: string;

  @MaxLength(255)
  @IsOptional()
  @ApiPropertyOptional({ maxLength: 255 })
  subtitle?: string;

  @MaxLength(255)
  @IsOptional()
  @ApiPropertyOptional({ maxLength: 255 })
  posterUrl?: string;

  @MaxLength(255)
  @IsOptional()
  @ApiPropertyOptional({ maxLength: 255 })
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
