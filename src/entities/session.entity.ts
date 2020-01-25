import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import { User } from './user.entity';

@Entity()
@Unique(['token'])
export class Session {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'uuid' })
  public token: string;

  @Column({ length: 255 })
  public fingerprint: string;

  @Column({ length: 255, name: 'user_agent' })
  public userAgent: string;

  @Column({ type: 'bigint', name: 'expires_in' })
  public expiresIn: number;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'user_id' })
  public user: User;
}
