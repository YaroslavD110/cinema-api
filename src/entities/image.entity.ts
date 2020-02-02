import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('images')
export class Image {
  @PrimaryColumn('uuid')
  public id: string;

  @Column({ length: 255 })
  public mimetype: string;

  @Column({ length: 5 })
  public extension: string;

  @Column({ type: 'int' })
  public size: number;

  public toResponseValue() {
    return `${this.id}${this.extension}`;
  }
}
