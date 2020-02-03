import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  Unique,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';

import { CRUDEntity } from '../shared/crud/crud.entity';
import { Genre } from './genre.entity';
import { Director } from './director.entity';
import { Country } from './country.entity';
import { Image } from './image.entity';
import { Actor } from './actor.entity';

@Entity('films')
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

  @Column({ type: 'smallint' })
  public year: number;

  @Column({ type: 'bigint', name: 'views_number', default: 0 })
  public viewsNumber: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @Column({ type: 'text' })
  public description: string;

  @Column({ length: 255, name: 'iframe_url', nullable: true })
  public iframeURL?: string;

  @Column({ type: 'date', name: 'release_date', nullable: true })
  public releaseDate?: Date;

  @Column({ type: 'smallint', nullable: true })
  public runtime?: number;

  @Column({ length: 255, name: 'imdb_id', nullable: true })
  public IMDBid?: string;

  @Column({ type: 'decimal', nullable: true })
  public IMDBRating?: number;

  @Column({ length: 255, nullable: true })
  public production?: string;

  @OneToOne(type => Image)
  @JoinColumn({ name: 'poster_img_id' })
  public posterImg?: Image | string;

  @ManyToMany(type => Image)
  @JoinTable({
    name: 'film_screenshots',
    joinColumn: {
      name: 'film_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'image_id',
      referencedColumnName: 'id'
    }
  })
  public screenshots: Array<Image | string>;

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

    if (this.posterImg instanceof Image) {
      filmRest.posterImg = this.posterImg.toResponseValue();
    }

    if (Array.isArray(this.screenshots) && this.screenshots.length) {
      filmRest.screenshots = this.screenshots.map(screenshot => {
        if (screenshot instanceof Image) {
          return screenshot.toResponseValue();
        }
      });
    }

    return filmRest;
  }
}
