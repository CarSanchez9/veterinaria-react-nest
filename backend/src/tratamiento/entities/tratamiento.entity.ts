import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';

import { HistoriaClinica } from '../../historia-clinica/entities/historia-clinica.entity';

@Entity()
export class Tratamiento {

  @PrimaryGeneratedColumn()
  idTratamiento: number;

  @Column()
  medicamento: string;

  @Column()
  dosis: string;

  @Column()
  duracion: string;

  @Column()
  idHistoria: number;

  @ManyToOne(
    () => HistoriaClinica,
    (historia) => historia.tratamientos,
  )
  @JoinColumn({
    name: 'idHistoria',
  })
  historia: HistoriaClinica;

  @DeleteDateColumn()
  eliminadoEn: Date;
}