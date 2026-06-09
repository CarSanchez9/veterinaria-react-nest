import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { LogAcceso } from './entities/log-acceso.entity';

import { CreateLogAccesoDto } from './dto/create-log-acceso.dto';

import { UpdateLogAccesoDto } from './dto/update-log-acceso.dto';

@Injectable()
export class LogAccesoService {

  constructor(
    @InjectRepository(LogAcceso)
    private repositorio:
      Repository<LogAcceso>,
  ) {}

  async create(
    createLogAccesoDto:
      CreateLogAccesoDto,
  ) {

    const log =
      this.repositorio.create({
        ...createLogAccesoDto,
        fecha: new Date(),
      });

    return await this.repositorio.save(
      log,
    );
  }

  async findAll() {
    return await this.repositorio.find({
      order: {
        fecha: 'DESC',
      },
    });
  }

  async findOne(id: number) {

    const log =
      await this.repositorio.findOne({
        where: {
          idLog: id,
        },
      });

    if (!log) {
      throw new NotFoundException(
        'Log no encontrado',
      );
    }

    return log;
  }

  async update(
    id: number,
    updateLogAccesoDto:
      UpdateLogAccesoDto,
  ) {

    const log =
      await this.findOne(id);

    Object.assign(
      log,
      updateLogAccesoDto,
    );

    await this.repositorio.save(log);

    return {
      mensaje: 'Log actualizado',
    };
  }

  async remove(id: number) {

    const log =
      await this.findOne(id);

    await this.repositorio.remove(log);

    return {
      mensaje: 'Log eliminado',
    };
  }
}