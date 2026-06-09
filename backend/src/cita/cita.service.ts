import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Cita } from './entities/cita.entity';

import { CreateCitaDto } from './dto/create-cita.dto';

import { UpdateCitaDto } from './dto/update-cita.dto';

import { LogAccesoService }
from '../log-acceso/log-acceso.service';

@Injectable()
export class CitaService {

  constructor(
    @InjectRepository(Cita)
    private repositorio: Repository<Cita>,

    private logAccesoService:
      LogAccesoService,
  ) {}

  async create(
    createCitaDto: CreateCitaDto,
  ) {

    const cita =
      this.repositorio.create(
        createCitaDto,
      );

    const nuevaCita =
      await this.repositorio.save(
        cita,
      );

    await this.logAccesoService.create({
      idUsuario: 1,
      accion: 'CREAR_CITA',
      ip: 'localhost',
    });

    return nuevaCita;
  }

  async findAll() {

    return await this.repositorio.find({
      relations: {
        mascota: true,
        veterinario: true,
      },
    });
  }

  async findOne(id: number) {

    const cita =
      await this.repositorio.findOne({
        where: {
          idCita: id,
        },
        relations: {
          mascota: true,
          veterinario: true,
        },
      });

    if (!cita) {
      throw new NotFoundException(
        'Cita no encontrada',
      );
    }

    return cita;
  }

  async update(
    id: number,
    updateCitaDto: UpdateCitaDto,
  ) {

    const cita =
      await this.findOne(id);

    Object.assign(
      cita,
      updateCitaDto,
    );

    await this.repositorio.save(
      cita,
    );

    return {
      mensaje: 'Cita actualizada',
    };
  }

  async remove(id: number) {

    const cita =
      await this.findOne(id);

    await this.repositorio.softRemove(
      cita,
    );

    await this.logAccesoService.create({
      idUsuario: 1,
      accion: 'ELIMINAR_CITA',
      ip: 'localhost',
    });

    return {
      mensaje: 'Cita eliminada',
    };
  }
}