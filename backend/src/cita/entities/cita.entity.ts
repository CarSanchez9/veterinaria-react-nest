import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';

import { Mascota } from '../../mascota/entities/mascota.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity()
export class Cita {

  @PrimaryGeneratedColumn()
  idCita: number;

  @Column({
    type: 'datetime',
  })
  fechaHora: Date;

  @Column()
  motivo: string;

  @Column({
    default: 'PENDIENTE',
  })
  estado: string;

  @Column()
  idMascota: number;

  @ManyToOne(
    () => Mascota,
  )
  @JoinColumn({
    name: 'idMascota',
  })
  mascota: Mascota;

  @Column()
  idVeterinario: number;

  @ManyToOne(
    () => Usuario,
  )
  @JoinColumn({
    name: 'idVeterinario',
  })
  veterinario: Usuario;

  @DeleteDateColumn()
  eliminadoEn: Date;
}