import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateHistoriaClinicaDto {

  @IsNotEmpty()
  diagnostico: string;

  @IsNotEmpty()
  tratamiento: string;

  @IsNotEmpty()
  observaciones: string;

  @IsNumber()
  idMascota: number;
}