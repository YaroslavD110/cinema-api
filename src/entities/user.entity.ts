import { Session } from './session.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany
} from 'typeorm';
import { hash } from 'bcrypt';

import { Permission } from './permission.entity';

@Entity('users')
@Unique(['username', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 254 })
  public username: string;

  @Column({ name: 'first_name', length: 255 })
  public firstName: string;

  @Column({ name: 'last_name', length: 255 })
  public lastName: string;

  @Column({ length: 255 })
  public email: string;

  @Column({ length: 255 })
  public password: string;

  @Column({ length: 255 })
  public salt: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

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
  public permissions: Permission[];

  @OneToMany(
    type => Session,
    session => session.user
  )
  public sessions: Session[];

  public async comparePassword(password: string) {
    const hashedPassword = await hash(password, this.salt);
    return hashedPassword === this.password;
  }

  public toResponseObject() {
    let { password, salt, sessions, ...restFields } = this;

    return restFields;
  }
}
