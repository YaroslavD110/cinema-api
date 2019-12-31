import { MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LabelDTO {
  @MaxLength(254)
  @IsNotEmpty()
  @ApiProperty()
  label: string;

  @MaxLength(254)
  @IsNotEmpty()
  @ApiProperty()
  slug: string;
}
