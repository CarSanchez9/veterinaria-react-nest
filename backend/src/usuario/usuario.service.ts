import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import * as bcrypt from 'bcryptjs';

import { Usuario } from './entities/usuario.entity';

import { CreateUsuarioDto } from './dto/create-usuario.dto';

import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private readonly repositorio: Repository<Usuario>,
  ) {}

  async create(
    createUsuarioDto: CreateUsuarioDto,
  ) {

    const passwordHash =
      await bcrypt.hash(
        createUsuarioDto.password,
        10,
      );

    const usuario =
      this.repositorio.create({
        ...createUsuarioDto,
        password: passwordHash,
      });

    return await this.repositorio.save(
      usuario,
    );
  }

  async findAll() {

    return await this.repositorio.find({
      relations: {
        rol: true,
      },
    });
  }

  async findOne(id: number) {

    const usuario =
      await this.repositorio.findOne({
        where: {
          idUsuario: id,
        },
        relations: {
          rol: true,
        },
      });

    if (!usuario) {
      throw new NotFoundException(
        'Usuario no encontrado',
      );
    }

    return usuario;
  }

  async findByEmail(email: string) {

    return await this.repositorio.findOne({
      where: {
        email,
      },
      relations: {
        rol: true,
      },
    });
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ) {

    const usuario =
      await this.findOne(id);

    if (updateUsuarioDto.password) {

      updateUsuarioDto.password =
        await bcrypt.hash(
          updateUsuarioDto.password,
          10,
        );
    }

    Object.assign(
      usuario,
      updateUsuarioDto,
    );

    await this.repositorio.save(
      usuario,
    );

    return {
      mensaje: 'Usuario actualizado',
    };
  }

  async remove(id: number) {

    const usuario =
      await this.findOne(id);

    await this.repositorio.softRemove(
      usuario,
    );

    return {
      mensaje:
        'Usuario eliminado lógicamente',
    };
  }
}