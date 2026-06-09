import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';

import { Rol } from '../../rol/entities/rol.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column({
    length: 100,
  })
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  idRol: number;

  @ManyToOne(
    () => Rol,
    (rol) => rol.usuarios,
  )
  @JoinColumn({
    name: 'idRol',
  })
  rol: Rol;

  @DeleteDateColumn()
  eliminadoEn: Date;
}