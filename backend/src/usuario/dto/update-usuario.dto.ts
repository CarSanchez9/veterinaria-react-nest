import {
  IsString,
  IsEmail,
  IsInt,
  IsOptional,
} from 'class-validator';

export class UpdateUsuarioDto {

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsInt()
  idRol?: number;
}