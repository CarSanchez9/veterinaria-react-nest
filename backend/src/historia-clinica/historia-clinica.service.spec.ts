import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { HistoriaClinica } from './entities/historia-clinica.entity';

import { CreateHistoriaClinicaDto } from './dto/create-historia-clinica.dto';

import { UpdateHistoriaClinicaDto } from './dto/update-historia-clinica.dto';

@Injectable()
export class HistoriaClinicaService {

  constructor(
    @InjectRepository(HistoriaClinica)
    private repositorio: Repository<HistoriaClinica>,
  ) {}

  async create(
    createHistoriaClinicaDto: CreateHistoriaClinicaDto,
  ) {

    const historia =
      this.repositorio.create(
        createHistoriaClinicaDto,
      );

    return await this.repositorio.save(
      historia,
    );
  }

  async findAll() {

    return await this.repositorio.find({
      relations: {
        mascota: true,
      },
    });
  }

  async findOne(id: number) {

    const historia =
      await this.repositorio.findOne({
        where: {
          idHistoria: id,
        },

        relations: {
          mascota: true,
        },
      });

    if (!historia) {
      throw new NotFoundException(
        'Historia clínica no encontrada',
      );
    }

    return historia;
  }

  async update(
    id: number,
    updateHistoriaClinicaDto: UpdateHistoriaClinicaDto,
  ) {

    const historia =
      await this.findOne(id);

    Object.assign(
      historia,
      updateHistoriaClinicaDto,
    );

    await this.repositorio.save(
      historia,
    );

    return {
      mensaje:
        'Historia clínica actualizada',
    };
  }

  async remove(id: number) {

    const historia =
      await this.findOne(id);

    await this.repositorio.softRemove(
      historia,
    );

    return {
      mensaje:
        'Historia clínica eliminada',
    };
  }
}