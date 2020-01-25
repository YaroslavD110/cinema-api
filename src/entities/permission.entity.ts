import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  Unique
} from 'typeorm';

import { User } from './user.entity';

@Entity('permission')
@Unique(['name'])
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ length: 254 })
  public name: string;

  @Column({ length: 254 })
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
