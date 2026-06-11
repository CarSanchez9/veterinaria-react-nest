import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsInt,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto {

  @IsString({
    message: 'El usuario debe ser texto',
  })
  @IsNotEmpty({
    message: 'El usuario es obligatorio',
  })
  username: string;

  @IsEmail(
    {},
    {
      message:
        'Debe ingresar un correo electrónico válido',
    },
  )
  email: string;

  @IsString()
  @IsNotEmpty({
    message:
      'La contraseña es obligatoria',
  })
  @MinLength(8, {
    message:
      'La contraseña debe tener al menos 8 caracteres',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
    {
      message:
        'La contraseña debe contener una mayúscula, una minúscula, un número y un carácter especial',
    },
  )
  password: string;

  @IsInt({
    message:
      'Debe seleccionar un rol válido',
  })
  idRol: number;
}