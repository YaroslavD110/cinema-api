import { MaxLength, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DirectorRequestDTO {
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

  @MaxLength(2500)
  @IsNotEmpty()
  @ApiProperty()
  birthDate: Date;
}

export class DirectorDTO {
  @MaxLength(255)
  @IsOptional()
  @ApiPropertyOptional({ maxLength: 255 })
  posterImgName?: string;
}
