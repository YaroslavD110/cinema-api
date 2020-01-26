import { MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CountryDTO {
  @MaxLength(255)
  @IsNotEmpty()
  @ApiProperty({ maxLength: 255 })
  label: string;

  @MaxLength(255)
  @IsNotEmpty()
  @ApiProperty({ maxLength: 255 })
  slug: string;
}
