import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { Usuario } from '../../usuario/entities/usuario.entity';

export enum NombreRol {
  ADMIN = 'ADMIN',
  RECEPCIONISTA = 'RECEPCIONISTA',
  VETERINARIO = 'VETERINARIO',
}

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  idRol: number;

  @Column({
    unique: true,
  })
  nombre: string;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @OneToMany(
    () => Usuario,
    (usuario) => usuario.rol,
  )
  usuarios: Usuario[];
}