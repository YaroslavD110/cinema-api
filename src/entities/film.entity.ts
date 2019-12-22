import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';

import { Genre } from './genre.entity';

@Entity('film')
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 254 })
  @MaxLength(254)
  @IsNotEmpty()
  title: string;

  @Column({ length: 254 })
  @MaxLength(254)
  @IsNotEmpty()
  slug: string;

  @Column({ length: 254, nullable: true })
  @MaxLength(254)
  subtitle?: string;

  @Column({ name: 'poster_url', length: 254, nullable: true })
  @MaxLength(254)
  posterUrl?: string;

  @Column({ name: 'video_frame_url', length: 254, nullable: true })
  @MaxLength(254)
  videoFrameUrl?: string;

  @Column({ type: 'text' })
  @MaxLength(2500)
  @IsNotEmpty()
  description: string;

  @Column({ type: 'float', name: 'imdb_rating' })
  @IsNotEmpty()
  IMDBRating: number;

  @Column({ type: 'smallint' })
  @IsNotEmpty()
  year: number;

  @ManyToMany(type => Genre)
  @JoinTable({
    name: 'film_genres',
    joinColumn: {
      name: 'film_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'genre_id',
      referencedColumnName: 'id'
    }
  })
  genres: Genre[];
}
