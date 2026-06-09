import {
    IsNotEmpty,
} from 'class-validator';

export class CreateClienteDto {

    @IsNotEmpty()
    nombre: string;

    @IsNotEmpty()
    apellido: string;

    @IsNotEmpty()
    ci: string;

    @IsNotEmpty()
    telefono: string;
    @IsNotEmpty()
    direccion: string;
}