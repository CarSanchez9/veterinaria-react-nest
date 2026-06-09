import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    DeleteDateColumn,
    OneToMany,
} from 'typeorm';

import { Mascota } from '../../mascota/entities/mascota.entity';
import { Tratamiento } from 'src/tratamiento/entities/tratamiento.entity';


@Entity()
export class HistoriaClinica {
    @PrimaryGeneratedColumn()
    idHistoria: number;

    @Column('text')
    diagnostico: string;

    @Column('text')
    tratamiento: string;

    @Column('text')
    observaciones: string;

    @Column()
    idMascota: number;

    @ManyToOne(
        () => Mascota,
        (mascota) => mascota.historias,
    )
    @JoinColumn({
        name: 'idMascota',
    })
    mascota: Mascota;

    @DeleteDateColumn()
    eliminadoEn: Date;
    @OneToMany(
        () => Tratamiento,
        (tratamiento) => tratamiento.historia,
    )
    tratamientos: Tratamiento[];
}