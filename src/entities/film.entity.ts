import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  Unique,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

import { Genre } from './genre.entity';
import { Director } from './director.entity';
import { Country } from './country.entity';

@Entity('film')
@Unique(['slug', 'subtitle'])
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 254 })
  title: string;

  @Column({ length: 254 })
  slug: string;

  @Column({ length: 254, nullable: true })
  subtitle?: string;

  @Column({ name: 'poster_url', length: 254, nullable: true })
  posterUrl?: string;

  @Column({ name: 'video_frame_url', length: 254, nullable: true })
  videoFrameUrl?: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'float', name: 'imdb_rating' })
  IMDBRating: number;

  @Column({ type: 'smallint' })
  year: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

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
