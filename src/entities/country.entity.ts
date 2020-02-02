import { PrimaryGeneratedColumn, Column, Entity, Unique } from 'typeorm';

import { CRUDEntity } from '../shared/crud/crud.entity';

@Entity('countries')
@Unique(['slug'])
export class Country implements CRUDEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 255 })
  public name: string;

  @Column({ length: 255 })
  public slug: string;

  public toResponseObject() {
    return this;
  }
}
