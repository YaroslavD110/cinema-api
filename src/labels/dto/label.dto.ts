import { MaxLength, IsNotEmpty } from 'class-validator';

export class LabelDTO {
  @MaxLength(254)
  @IsNotEmpty()
  label: string;

  @MaxLength(254)
  @IsNotEmpty()
  slug: string;
}
