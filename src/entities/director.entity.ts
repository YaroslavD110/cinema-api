import { PrimaryGeneratedColumn, Column, Entity, Unique } from 'typeorm';
import { MaxLength, IsNotEmpty } from 'class-validator';

@Entity('director')
@Unique(['slug'])
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
