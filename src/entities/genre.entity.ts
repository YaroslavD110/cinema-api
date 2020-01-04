import { PrimaryGeneratedColumn, Column, Entity, Unique } from 'typeorm';

@Entity('genre')
@Unique(['slug'])
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 254 })
  label: string;

  @Column({ length: 254 })
  slug: string;
}
