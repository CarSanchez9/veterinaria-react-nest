import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    DeleteDateColumn,
    OneToMany,
} from 'typeorm';

import { Cliente } from '../../cliente/entities/cliente.entity';
import { HistoriaClinica } from '../../historia-clinica/entities/historia-clinica.entity';
import { Cita } from '../../cita/entities/cita.entity';
import { Vacuna }
from '../../vacuna/entities/vacuna.entity';

@Entity()
export class Mascota {
    @PrimaryGeneratedColumn()
    idMascota: number;

    @Column({
        length: 100,
    })
    nombre: string;

    @Column({
        length: 50,
    })
    especie: string;

    @Column({
        length: 50,
    })
    raza: string;

    @Column()
    edad: number;

    @Column({
        length: 20,
    })
    sexo: string;

    @Column()
    idCliente: number;

    @ManyToOne(
        () => Cliente,
        (cliente) => cliente.mascotas,
    )
    @JoinColumn({
        name: 'idCliente',
    })
    cliente: Cliente;

    @OneToMany(
        () => HistoriaClinica,
        (historia) => historia.mascota,
    )
    historias: HistoriaClinica[];

    @OneToMany(
        () => Cita,
        (cita) => cita.mascota,
    )
    citas: Cita[];
    @OneToMany(
        () => Vacuna,
        (vacuna) => vacuna.mascota,
    )
    vacunas: Vacuna[];

    @DeleteDateColumn()
    eliminadoEn: Date;
}