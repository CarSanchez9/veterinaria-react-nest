import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateTratamientoDto {

  @IsNotEmpty()
  medicamento: string;

  @IsNotEmpty()
  dosis: string;

  @IsNotEmpty()
  duracion: string;

  @IsNumber()
  idHistoria: number;
}