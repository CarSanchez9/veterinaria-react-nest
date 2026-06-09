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

import { UsuarioService } from './usuario.service';

import { CreateUsuarioDto } from './dto/create-usuario.dto';

import { UpdateUsuarioDto } from './dto/update-usuario.dto';

import { Auth } from '../auth/decorators/auth.decorator';

import { NombreRol } from '../rol/entities/rol.entity';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
  ) {}

  @Auth(NombreRol.ADMIN)
  @Post()
  create(
    @Body()
    createUsuarioDto: CreateUsuarioDto,
  ) {
    return this.usuarioService.create(
      createUsuarioDto,
    );
  }

  @Auth(NombreRol.ADMIN)
  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Auth(NombreRol.ADMIN)
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.usuarioService.findOne(id);
  }

  @Auth(NombreRol.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuarioService.update(
      id,
      updateUsuarioDto,
    );
  }

  @Auth(NombreRol.ADMIN)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.usuarioService.remove(id);
  }
}