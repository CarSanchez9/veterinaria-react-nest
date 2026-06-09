import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Mascota } from './entities/mascota.entity';

import { CreateMascotaDto } from './dto/create-mascota.dto';

import { UpdateMascotaDto } from './dto/update-mascota.dto';

import { LogAccesoService }
  from '../log-acceso/log-acceso.service';

@Injectable()
export class MascotaService {

  constructor(
    @InjectRepository(Mascota)
    private repositorio: Repository<Mascota>,

    private logAccesoService:
      LogAccesoService,
  ) { }

  async create(
    createMascotaDto: CreateMascotaDto,
  ) {

    const mascota =
      this.repositorio.create(
        createMascotaDto,
      );

    const nuevaMascota =
      await this.repositorio.save(
        mascota,
      );

    await this.logAccesoService.create({
      idUsuario: 1,
      accion: 'CREAR_MASCOTA',
      ip: 'localhost',
    });

    return nuevaMascota;
  }

  async findAll() {

    return await this.repositorio.find({
      relations: {
        cliente: true,
      },
    });
  }

  async findOne(id: number) {

    const mascota =
      await this.repositorio.findOne({
        where: {
          idMascota: id,
        },
        relations: {
          cliente: true,
        },
      });

    if (!mascota) {
      throw new NotFoundException(
        'Mascota no encontrada',
      );
    }

    return mascota;
  }

  async update(
    id: number,
    updateMascotaDto: UpdateMascotaDto,
  ) {

    const mascota =
      await this.findOne(id);

    Object.assign(
      mascota,
      updateMascotaDto,
    );

    await this.repositorio.save(
      mascota,
    );

    return {
      mensaje: 'Mascota actualizada',
    };
  }

  async remove(id: number) {

    const mascota =
      await this.findOne(id);

    await this.repositorio.softRemove(
      mascota,
    );

    await this.logAccesoService.create({
      idUsuario: 1,
      accion: 'ELIMINAR_MASCOTA',
      ip: 'localhost',
    });

    return {
      mensaje: 'Mascota eliminada',
    };
  }
}