import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';

import { Mascota } from '../../mascota/entities/mascota.entity';

@Entity()
export class Vacuna {

  @PrimaryGeneratedColumn()
  idVacuna: number;

  @Column()
  nombre: string;

  @Column()
  fechaAplicacion: Date;

  @Column()
  proximaDosis: Date;

  @Column()
  idMascota: number;

  @ManyToOne(
    () => Mascota,
    (mascota) => mascota.vacunas,
  )
  @JoinColumn({
    name: 'idMascota',
  })
  mascota: Mascota;

  @DeleteDateColumn()
  eliminadoEn: Date;
}