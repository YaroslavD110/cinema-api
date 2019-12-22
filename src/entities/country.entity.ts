import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { MaxLength, IsNotEmpty } from 'class-validator';

@Entity('country')
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 254 })
  @MaxLength(254)
  @IsNotEmpty()
  label: string;

  @Column({ length: 254 })
  @MaxLength(254)
  @IsNotEmpty()
  slug: string;
}
