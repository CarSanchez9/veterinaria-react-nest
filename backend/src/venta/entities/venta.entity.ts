import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';

import { Cliente } from '../../cliente/entities/cliente.entity';
import { Producto } from '../../producto/entities/producto.entity';

@Entity()
export class Venta {

  @PrimaryGeneratedColumn()
  idVenta: number;

  @Column()
  fechaVenta: Date;

  @Column()
  cantidad: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
  })
  total: number;

  @Column()
  idCliente: number;

  @ManyToOne(
    () => Cliente,
    (cliente) => cliente.ventas,
  )
  @JoinColumn({
    name: 'idCliente',
  })
  cliente: Cliente;

  @Column()
  idProducto: number;

  @ManyToOne(
    () => Producto,
  )
  @JoinColumn({
    name: 'idProducto',
  })
  producto: Producto;

  @DeleteDateColumn()
  eliminadoEn: Date;
}