import { MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DirectorDTO {
  @MaxLength(254)
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @MaxLength(254)
  @IsNotEmpty()
  @ApiProperty()
  slug: string;
}
