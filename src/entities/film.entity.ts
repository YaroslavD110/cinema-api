import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  Unique,
  JoinTable
} from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';

import { Genre } from './genre.entity';
import { Director } from './director.entity';
import { Country } from './country.entity';

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

  @ManyToMany(type => Director)
  @JoinTable({
    name: 'film_directors',
    joinColumn: {
      name: 'film_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'director_id',
      referencedColumnName: 'id'
    }
  })
  directors: Director[];

  @ManyToMany(type => Country)
  @JoinTable({
    name: 'film_countries',
    joinColumn: {
      name: 'film_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'country_id',
      referencedColumnName: 'id'
    }
  })
  countries: Country[];
}
