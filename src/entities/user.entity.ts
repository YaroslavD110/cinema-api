import {
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { hash } from 'bcrypt';

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
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  public async comparePassword(password: string) {
    const hashedPassword = await hash(password, this.salt);
    return hashedPassword === this.password;
  }

  public toResponseObject() {
    let { password, salt, ...restFields } = this;

    return restFields;
  }
}
