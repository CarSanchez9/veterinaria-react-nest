import {
  IsNotEmpty,
  Matches,
  Length,
} from 'class-validator';

export class CreateClienteDto {

  @IsNotEmpty()
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras',
  })
  nombre: string;

  @IsNotEmpty()
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El apellido solo puede contener letras',
  })
  apellido: string;

  @IsNotEmpty()
  @Matches(/^[0-9]+$/, {
    message: 'El CI solo puede contener números',
  })
  ci: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{8}$/, {
    message:
      'El teléfono debe tener exactamente 8 dígitos',
  })
  telefono: string;

  @IsNotEmpty()
  direccion: string;
}