import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { MaxLength, IsNotEmpty } from 'class-validator';

import { Film } from './film.entity';

@Entity('genre')
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
