import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class LogAcceso {

  @PrimaryGeneratedColumn()
  idLog: number;

  @Column()
  fecha: Date;

  @Column()
  idUsuario: number;

  @Column({
    length: 50,
  })
  accion: string;

  @Column({
    nullable: true,
  })
  ip: string;
}