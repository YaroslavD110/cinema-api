import {
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsInt,
  ArrayNotEmpty
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import {
  parseIntArrayTransform,
  parseDate
} from '../../../shared/data.transform';
import { FileDTO } from '../../../shared/dto/file.dto';

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
  @IsOptional()
  @ApiPropertyOptional()
  posterImg?: FileDTO;
}
