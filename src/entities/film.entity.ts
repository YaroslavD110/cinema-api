import { Actor } from './actor.entity';
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

import { CRUDEntity } from 'src/shared/crud/crud.entity';
import { Genre } from './genre.entity';
import { Director } from './director.entity';
import { Country } from './country.entity';

@Entity('film')
@Unique(['slug'])
export class Film implements CRUDEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 255 })
  public title: string;

  @Column({ length: 255 })
  public slug: string;

  @Column({ length: 255, name: 'eng_title', nullable: true })
  public engTitle?: string;

  @Column({ length: 255, name: 'poster_url', nullable: true })
  public posterImgName?: string;

  @Column({ type: 'text' })
  public description: string;

  @Column({ type: 'smallint' })
  public year: number;

  @Column({ type: 'bigint', name: 'views_number', default: 0 })
  public viewsNumber: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

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
  public genres: Genre[];

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
  public directors: Director[];

  @ManyToMany(type => Actor)
  @JoinTable({
    name: 'film_actors',
    joinColumn: {
      name: 'film_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'actor_id',
      referencedColumnName: 'id'
    }
  })
  public actors: Actor[];

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
  public countries: Country[];

  public toResponseObject() {
    const { viewsNumber, updatedAt, ...filmRest } = this;

    return filmRest;
  }
}
