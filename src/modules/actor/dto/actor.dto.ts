import {
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsInt,
  ArrayNotEmpty,
  IsDate
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import { parseIntArrayTransform, parseDate } from 'src/shared/data.transform';

export class ActorRequestDTO {
  @MaxLength(255)
  @IsNotEmpty()
  @ApiProperty({ maxLength: 255 })
  name: string;

  @MaxLength(255)
  @IsNotEmpty()
  @ApiProperty({ maxLength: 255 })
  slug: string;

  @MaxLength(255)
  @IsOptional()
  @ApiPropertyOptional({ maxLength: 255 })
  engName?: string;

  @MaxLength(255)
  @IsOptional()
  @ApiPropertyOptional({ maxLength: 255 })
  birthPlace?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @Transform(parseDate)
  birthDate?: Date;

  @IsInt({ each: true })
  @ArrayNotEmpty()
  @Transform(parseIntArrayTransform)
  @ApiProperty({ type: [Number] })
  genres: number[];

  @IsInt({ each: true })
  @Transform(parseIntArrayTransform)
  @ApiProperty({ type: [Number] })
  films: number[];
}

export class ActorDTO extends ActorRequestDTO {
  @MaxLength(255)
  @IsOptional()
  @ApiPropertyOptional({ maxLength: 255 })
  posterImgName?: string;
}
