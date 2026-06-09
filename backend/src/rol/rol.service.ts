import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Rol } from './entities/rol.entity';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepo: Repository<Rol>,
  ) {}

  create(dto: any) {
    const rol = this.rolRepo.create(dto);

    return this.rolRepo.save(rol);
  }

  findAll() {
    return this.rolRepo.find();
  }

  async findOne(id: number) {
    const rol = await this.rolRepo.findOne({
      where: { idRol: id },
    });

    if (!rol)
      throw new NotFoundException();

    return rol;
  }

  async update(id: number, dto: any) {
    const rol = await this.findOne(id);

    Object.assign(rol, dto);

    return this.rolRepo.save(rol);
  }

  async remove(id: number) {
    await this.rolRepo.softDelete(id);

    return {
      mensaje: 'Rol eliminado',
    };
  }
}