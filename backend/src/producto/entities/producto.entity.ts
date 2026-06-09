import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Producto {

  @PrimaryGeneratedColumn()
  idProducto: number;

  @Column({
    length: 100,
  })
  nombre: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
  })
  precio: number;

  @Column()
  stock: number;

  @Column({
    length: 100,
  })
  categoria: string;

  @DeleteDateColumn()
  eliminadoEn: Date;
}