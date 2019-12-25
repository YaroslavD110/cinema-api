import { MaxLength, IsNotEmpty } from 'class-validator';

export class DirectorDTO {
  @MaxLength(254)
  @IsNotEmpty()
  name: string;

  @MaxLength(254)
  @IsNotEmpty()
  slug: string;
}
