import { PrimaryGeneratedColumn, Column, Entity, Unique } from 'typeorm';

import { CRUDEntity } from '../shared/crud/crud.entity';

@Entity('genres')
@Unique(['slug'])
export class Genre implements CRUDEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 255 })
  public label: string;

  @Column({ length: 255 })
  public slug: string;

  public toResponseObject() {
    return this;
  }
}
