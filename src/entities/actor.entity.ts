import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn
} from 'typeorm';

import { CRUDEntity } from '../shared/crud/crud.entity';
import { Film } from './film.entity';
import { Genre } from './genre.entity';
import { Image } from './image.entity';

@Entity('actors')
@Unique(['slug'])
export class Actor implements CRUDEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 255 })
  public name: string;

  @Column({ length: 255 })
  public slug: string;

  @Column({ length: 255, name: 'eng_name', nullable: true })
  public engName?: string;

  @Column({ length: 255, name: 'birth_place', nullable: true })
  public birthPlace?: string;

  @Column({ type: 'date', nullable: true })
  public birthDate?: Date;

  @OneToOne(type => Image)
  @JoinColumn({ name: 'poster_img_id' })
  public posterImg?: Image | string;

  @ManyToMany(type => Genre)
  @JoinTable({
    name: 'actor_genres',
    joinColumn: {
      name: 'actor_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'genre_id',
      referencedColumnName: 'id'
    }
  })
  public genres: Genre[];

  @ManyToMany(type => Film)
  @JoinTable({
    name: 'film_actors',
    joinColumn: {
      name: 'actor_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'film_id',
      referencedColumnName: 'id'
    }
  })
  public films: Film[];

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  public toResponseObject() {
    if (this.posterImg instanceof Image) {
      this.posterImg = this.posterImg.toResponseValue();
    }

    return this;
  }
}
