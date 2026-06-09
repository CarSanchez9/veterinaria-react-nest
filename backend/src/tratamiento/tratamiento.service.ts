import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Tratamiento } from './entities/tratamiento.entity';

import { CreateTratamientoDto } from './dto/create-tratamiento.dto';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';

@Injectable()
export class TratamientoService {

  constructor(
    @InjectRepository(Tratamiento)
    private repositorio: Repository<Tratamiento>,
  ) {}

  async create(
    createTratamientoDto: CreateTratamientoDto,
  ) {

    const tratamiento =
      this.repositorio.create(
        createTratamientoDto,
      );

    return await this.repositorio.save(
      tratamiento,
    );
  }

  async findAll() {

    return await this.repositorio.find({
      relations: {
        historia: true,
      },
    });
  }

  async findOne(id: number) {

    const tratamiento =
      await this.repositorio.findOne({
        where: {
          idTratamiento: id,
        },
        relations: {
          historia: true,
        },
      });

    if (!tratamiento) {
      throw new NotFoundException(
        'Tratamiento no encontrado',
      );
    }

    return tratamiento;
  }

  async update(
    id: number,
    updateTratamientoDto: UpdateTratamientoDto,
  ) {

    const tratamiento =
      await this.findOne(id);

    Object.assign(
      tratamiento,
      updateTratamientoDto,
    );

    await this.repositorio.save(
      tratamiento,
    );

    return {
      mensaje:
        'Tratamiento actualizado',
    };
  }

  async remove(id: number) {

    const tratamiento =
      await this.findOne(id);

    await this.repositorio.softRemove(
      tratamiento,
    );

    return {
      mensaje:
        'Tratamiento eliminado',
    };
  }
}