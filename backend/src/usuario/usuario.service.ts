import {
  Injectable,
  NotFoundException,
  BadRequestException,
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

    const existeEmail =
      await this.repositorio.findOne({
        where: {
          email:
            createUsuarioDto.email,
        },
      });

    if (existeEmail) {
      throw new BadRequestException(
        'El correo ya está registrado',
      );
    }

    const existeUsuario =
      await this.repositorio.findOne({
        where: {
          username:
            createUsuarioDto.username,
        },
      });

    if (existeUsuario) {
      throw new BadRequestException(
        'El nombre de usuario ya existe',
      );
    }

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

    if (
      updateUsuarioDto.email &&
      updateUsuarioDto.email !==
        usuario.email
    ) {

      const existeEmail =
        await this.repositorio.findOne({
          where: {
            email:
              updateUsuarioDto.email,
          },
        });

      if (existeEmail) {
        throw new BadRequestException(
          'El correo ya está registrado',
        );
      }
    }

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
      mensaje:
        'Usuario actualizado',
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