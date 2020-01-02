import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm';

import { User } from './user.entity';

@Entity()
@Unique(['identifier'])
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid')
  identifier: string;

  @Column()
  fingerprint: string;

  @Column()
  userAgent: string;

  @Column('bigint')
  expiresIn: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @ManyToOne(type => User)
  @JoinColumn()
  user: User;
}
