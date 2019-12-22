import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { MaxLength, IsNotEmpty } from 'class-validator';

@Entity('director')
export class Director {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 254 })
  @MaxLength(254)
  @IsNotEmpty()
  name: string;

  @Column({ length: 254 })
  @MaxLength(254)
  @IsNotEmpty()
  slug: string;
}
