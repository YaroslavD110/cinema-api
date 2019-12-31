import { PrimaryGeneratedColumn, Column, Entity, Unique } from 'typeorm';
import { MaxLength, IsNotEmpty } from 'class-validator';

@Entity('genre')
@Unique(['slug'])
export class Genre {
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
