import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { ClienteService }
from './cliente.service';

import { CreateClienteDto }
from './dto/create-cliente.dto';

import { UpdateClienteDto }
from './dto/update-cliente.dto';

import { Auth }
from '../auth/decorators/auth.decorator';

import { NombreRol }
from '../rol/entities/rol.entity';

@Controller('cliente')
export class ClienteController {

  constructor(
    private readonly clienteService:
    ClienteService,
  ) {}

  @Auth(
    NombreRol.ADMIN,
    NombreRol.RECEPCIONISTA,
  )
  @Post()
  create(
    @Body()
    createClienteDto:
    CreateClienteDto,
  ) {
    return this.clienteService.create(
      createClienteDto,
    );
  }

  @Auth(
    NombreRol.ADMIN,
    NombreRol.RECEPCIONISTA,
    NombreRol.VETERINARIO,
  )
  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  @Auth(
    NombreRol.ADMIN,
    NombreRol.RECEPCIONISTA,
    NombreRol.VETERINARIO,
  )
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.clienteService.findOne(
      id,
    );
  }

  @Auth(
    NombreRol.ADMIN,
    NombreRol.RECEPCIONISTA,
  )
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    updateClienteDto:
    UpdateClienteDto,
  ) {
    return this.clienteService.update(
      id,
      updateClienteDto,
    );
  }

  @Auth(
    NombreRol.ADMIN,
  )
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.clienteService.remove(
      id,
    );
  }
}