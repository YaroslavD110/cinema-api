import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsInt,
  ArrayNotEmpty
} from 'class-validator';

import {
  parseIntTransform,
  parseIntArrayTransform
} from '../../../shared/data.transform';

export class FilmRequestDTO {
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
  engTitle?: string;

  @MaxLength(2500)
  @IsNotEmpty()
  @ApiProperty({ maxLength: 2500 })
  description: string;

  @IsNotEmpty()
  @IsInt()
  @Transform(parseIntTransform)
  @ApiProperty()
  year: number;

  @IsInt({ each: true })
  @ArrayNotEmpty()
  @Transform(parseIntArrayTransform)
  @ApiProperty({ type: [Number] })
  actors: number[];

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

export class FilmDTO {
  @MaxLength(255)
  @IsOptional()
  @ApiPropertyOptional({ maxLength: 255 })
  posterImgName?: string;
}
