import {
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { hash } from 'bcrypt';

import { Permission } from './permission.entity';

@Entity()
@Unique(['username', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 254 })
  username: string;

  @Column({ name: 'first_name', length: 254 })
  firstName: string;

  @Column({ name: 'last_name', length: 254 })
  lastName: string;

  @Column({ length: 254 })
  email: string;

  @Column({ length: 254 })
  password: string;

  @Column({ length: 254 })
  salt: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(type => Permission)
  @JoinTable({
    name: 'user_permissions',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id'
    }
  })
  permissions: Permission[];

  public async comparePassword(password: string) {
    const hashedPassword = await hash(password, this.salt);
    return hashedPassword === this.password;
  }

  public toResponseObject() {
    let { password, salt, ...restFields } = this;

    return restFields;
  }
}
