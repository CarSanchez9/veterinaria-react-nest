import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Vacuna } from './entities/vacuna.entity';

import { CreateVacunaDto } from './dto/create-vacuna.dto';
import { UpdateVacunaDto } from './dto/update-vacuna.dto';

@Injectable()
export class VacunaService {

  constructor(
    @InjectRepository(Vacuna)
    private repositorio: Repository<Vacuna>,
  ) {}

  async create(createVacunaDto: CreateVacunaDto) {

    const vacuna =
      this.repositorio.create(createVacunaDto);

    return await this.repositorio.save(vacuna);
  }

  async findAll() {

    return await this.repositorio.find({
      relations: {
        mascota: true,
      },
    });
  }

  async findOne(id: number) {

    const vacuna =
      await this.repositorio.findOne({
        where: {
          idVacuna: id,
        },
        relations: {
          mascota: true,
        },
      });

    if (!vacuna) {
      throw new NotFoundException(
        'Vacuna no encontrada',
      );
    }

    return vacuna;
  }

  async update(
    id: number,
    updateVacunaDto: UpdateVacunaDto,
  ) {

    const vacuna =
      await this.findOne(id);

    Object.assign(
      vacuna,
      updateVacunaDto,
    );

    await this.repositorio.save(vacuna);

    return {
      mensaje: 'Vacuna actualizada',
    };
  }

  async remove(id: number) {

    const vacuna =
      await this.findOne(id);

    await this.repositorio.softRemove(vacuna);

    return {
      mensaje: 'Vacuna eliminada',
    };
  }
}