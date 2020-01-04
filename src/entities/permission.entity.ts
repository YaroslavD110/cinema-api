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
  id: string;

  @Column({ length: 254 })
  name: string;

  @Column({ length: 254 })
  description: string;

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
  users: User[];
}
