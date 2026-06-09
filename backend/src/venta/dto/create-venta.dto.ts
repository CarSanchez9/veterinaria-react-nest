import {
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateVentaDto {

  @IsDateString()
  fechaVenta: Date;

  @IsNumber()
  cantidad: number;

  @IsNumber()
  total: number;

  @IsNumber()
  idCliente: number;

  @IsNumber()
  idProducto: number;
}