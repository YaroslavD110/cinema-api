import { PrimaryGeneratedColumn, Column, Entity, Unique } from 'typeorm';

@Entity('director')
@Unique(['slug'])
export class Director {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 254 })
  name: string;

  @Column({ length: 254 })
  slug: string;
}
