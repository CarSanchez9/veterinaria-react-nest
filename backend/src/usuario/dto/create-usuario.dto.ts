import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsInt,
} from 'class-validator';

export class CreateUsuarioDto {

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsInt()
  idRol: number;
}