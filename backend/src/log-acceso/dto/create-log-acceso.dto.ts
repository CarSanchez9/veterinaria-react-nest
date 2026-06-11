import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateLogAccesoDto {

  @IsNumber()
  idUsuario: number;

  @IsNotEmpty()
  accion: string;

  @IsNotEmpty()
  ip: string;

}