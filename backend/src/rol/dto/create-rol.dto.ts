import { IsNotEmpty } from 'class-validator';

export class CreateRolDto {
  @IsNotEmpty()
  nombre: string;
}