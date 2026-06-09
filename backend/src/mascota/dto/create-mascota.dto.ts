import { IsNotEmpty } from 'class-validator';

export class CreateMascotaDto {

  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  especie: string;

  @IsNotEmpty()
  raza: string;

  @IsNotEmpty()
  edad: number;

  @IsNotEmpty()
  sexo: string;

  @IsNotEmpty()
  idCliente: number;
}