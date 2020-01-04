import { PrimaryGeneratedColumn, Column, Entity, Unique } from 'typeorm';

@Entity('country')
@Unique(['slug'])
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 254 })
  label: string;

  @Column({ length: 254 })
  slug: string;
}
