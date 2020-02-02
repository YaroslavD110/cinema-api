import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  Unique
} from 'typeorm';

import { User } from './user.entity';

@Entity('permissions')
@Unique(['name'])
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ length: 255 })
  public name: string;

  @Column({ length: 255 })
  public description: string;

  @ManyToMany(type => User)
  @JoinTable({
    name: 'user_permissions',
    joinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    }
  })
  public users: User[];
}
