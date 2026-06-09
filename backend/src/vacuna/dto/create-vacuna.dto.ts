import {
  IsNotEmpty,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateVacunaDto {

  @IsNotEmpty()
  nombre: string;

  @IsDateString()
  fechaAplicacion: Date;

  @IsDateString()
  proximaDosis: Date;

  @IsNumber()
  idMascota: number;
}