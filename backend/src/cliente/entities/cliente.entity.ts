import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
} from 'typeorm';
import { OneToMany } from 'typeorm';
import { Mascota } from '../../mascota/entities/mascota.entity';

import { Venta } from '../../venta/entities/venta.entity';

@Entity()
export class Cliente {

    @PrimaryGeneratedColumn()
    idCliente: number;

    @Column({
        length: 100,
    })
    nombre: string;

    @Column({
        length: 100,
    })
    apellido: string;

    @Column({
        length: 20,
        unique: true,
    })
    ci: string;

    @Column({
        length: 20,
    })
    telefono: string;

    @Column({
        nullable: true,
    })
    direccion: string;

    @DeleteDateColumn()
    eliminadoEn: Date;
    @OneToMany(
        () => Mascota,
        (mascota) => mascota.cliente,
    )
    mascotas: Mascota[];
    @OneToMany(
        () => Venta,
        (venta) => venta.cliente,
    )
    ventas: Venta[];
}