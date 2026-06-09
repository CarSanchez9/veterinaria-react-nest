import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Venta } from './entities/venta.entity';

import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';

import { LogAccesoService } from '../log-acceso/log-acceso.service';

@Injectable()
export class VentaService {

  constructor(
    @InjectRepository(Venta)
    private repositorio: Repository<Venta>,

    private logAccesoService: LogAccesoService,
  ) {}

  async create(
    createVentaDto: CreateVentaDto,
  ) {

    const venta =
      this.repositorio.create(
        createVentaDto,
      );

    const nuevaVenta =
      await this.repositorio.save(
        venta,
      );

    await this.logAccesoService.create({
      idUsuario: 1,
      accion: 'CREAR_VENTA',
      ip: 'localhost',
    });

    return nuevaVenta;
  }

  async findAll() {

    return await this.repositorio.find({
      relations: {
        cliente: true,
        producto: true,
      },
    });
  }

  async findOne(id: number) {

    const venta =
      await this.repositorio.findOne({
        where: {
          idVenta: id,
        },
        relations: {
          cliente: true,
          producto: true,
        },
      });

    if (!venta) {
      throw new NotFoundException(
        'Venta no encontrada',
      );
    }

    return venta;
  }

  async update(
    id: number,
    updateVentaDto: UpdateVentaDto,
  ) {

    const venta =
      await this.findOne(id);

    Object.assign(
      venta,
      updateVentaDto,
    );

    await this.repositorio.save(
      venta,
    );

    return {
      mensaje:
        'Venta actualizada',
    };
  }

  async remove(id: number) {

    const venta =
      await this.findOne(id);

    await this.repositorio.softRemove(
      venta,
    );

    await this.logAccesoService.create({
      idUsuario: 1,
      accion: 'ELIMINAR_VENTA',
      ip: 'localhost',
    });

    return {
      mensaje:
        'Venta eliminada',
    };
  }
}