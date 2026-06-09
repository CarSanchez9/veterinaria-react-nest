import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Producto } from './entities/producto.entity';

import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductoService {

  constructor(
    @InjectRepository(Producto)
    private repositorio: Repository<Producto>,
  ) {}

  async create(
    createProductoDto: CreateProductoDto,
  ) {

    const producto =
      this.repositorio.create(
        createProductoDto,
      );

    return await this.repositorio.save(
      producto,
    );
  }

  async findAll() {

    return await this.repositorio.find();
  }

  async findOne(id: number) {

    const producto =
      await this.repositorio.findOne({
        where: {
          idProducto: id,
        },
      });

    if (!producto) {
      throw new NotFoundException(
        'Producto no encontrado',
      );
    }

    return producto;
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ) {

    const producto =
      await this.findOne(id);

    Object.assign(
      producto,
      updateProductoDto,
    );

    await this.repositorio.save(
      producto,
    );

    return {
      mensaje:
        'Producto actualizado',
    };
  }

  async remove(id: number) {

    const producto =
      await this.findOne(id);

    await this.repositorio.softRemove(
      producto,
    );

    return {
      mensaje:
        'Producto eliminado',
    };
  }
}