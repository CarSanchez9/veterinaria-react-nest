import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateCitaDto {

  @IsNotEmpty()
  fechaHora: Date;

  @IsNotEmpty()
  motivo: string;

  @IsNumber()
  idMascota: number;

  @IsNumber()
  idVeterinario: number;
}