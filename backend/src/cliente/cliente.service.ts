import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  InjectRepository,
} from '@nestjs/typeorm';

import {
  Repository,
} from 'typeorm';

import { Cliente }
from './entities/cliente.entity';

import { CreateClienteDto }
from './dto/create-cliente.dto';

import { UpdateClienteDto }
from './dto/update-cliente.dto';

import { LogAccesoService }
from '../log-acceso/log-acceso.service';

@Injectable()
export class ClienteService {

  constructor(
    @InjectRepository(Cliente)
    private repositorio: Repository<Cliente>,

    private logAccesoService:
      LogAccesoService,
  ) {}

  async create(
    createClienteDto: CreateClienteDto,
  ) {

    const cliente =
      this.repositorio.create(
        createClienteDto,
      );

    const nuevoCliente =
      await this.repositorio.save(
        cliente,
      );

    await this.logAccesoService.create({
      idUsuario: 1,
      accion: 'CREAR_CLIENTE',
      ip: 'localhost',
    });

    return nuevoCliente;
  }

  async findAll() {
    return await this.repositorio.find();
  }

  async findOne(id: number) {

    const cliente =
      await this.repositorio.findOne({
        where: {
          idCliente: id,
        },
      });

    if (!cliente) {
      throw new NotFoundException(
        'Cliente no encontrado',
      );
    }

    return cliente;
  }

  async update(
    id: number,
    updateClienteDto: UpdateClienteDto,
  ) {

    const cliente =
      await this.findOne(id);

    Object.assign(
      cliente,
      updateClienteDto,
    );

    await this.repositorio.save(
      cliente,
    );

    return {
      mensaje:
        'Cliente actualizado',
    };
  }

  async remove(id: number) {

    const cliente =
      await this.findOne(id);

    await this.repositorio.softRemove(
      cliente,
    );

    await this.logAccesoService.create({
      idUsuario: 1,
      accion: 'ELIMINAR_CLIENTE',
      ip: 'localhost',
    });

    return {
      mensaje:
        'Cliente eliminado',
    };
  }
}