import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Unique,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

import { CRUDEntity } from '../shared/crud/crud.entity';

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

  @Column({ length: 255, name: 'poster_img_name', nullable: true })
  public posterImgName?: string;

  @Column({ length: 255, name: 'birth_place', nullable: true })
  public birthPlace?: string;

  @Column({ type: 'date', nullable: true })
  public birthDate?: Date;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  public toResponseObject() {
    const { updatedAt, ...directorRest } = this;
    return directorRest;
  }
}
