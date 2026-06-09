import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateProductoDto {

  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  precio: number;

  @IsNumber()
  stock: number;

  @IsNotEmpty()
  categoria: string;
}