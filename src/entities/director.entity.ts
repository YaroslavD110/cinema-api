import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';

import { CRUDEntity } from '../shared/crud/crud.entity';
import { Image } from './image.entity';

@Entity('directors')
@Unique(['slug'])
export class Director implements CRUDEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 255 })
  public name: string;

  @Column({ length: 255 })
  public slug: string;

  @Column({ length: 255, name: 'eng_name', nullable: true })
  public engName?: string;

  @OneToOne(type => Image)
  @JoinColumn({ name: 'poster_img_id' })
  public posterImg?: Image | string;

  @Column({ length: 255, name: 'birth_place', nullable: true })
  public birthPlace?: string;

  @Column({ type: 'date', nullable: true })
  public birthDate?: Date;

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
