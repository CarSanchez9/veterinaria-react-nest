import {
  applyDecorators,
  UseGuards,
} from '@nestjs/common';

import { Roles } from './roles.decorator';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';

import { RolesGuard } from '../guards/roles/roles.guard';

import { NombreRol } from '../../rol/entities/rol.entity';

export function Auth(
  ...roles: NombreRol[]
) {
  return applyDecorators(
    Roles(...roles),

    UseGuards(
      JwtAuthGuard,
      RolesGuard,
    ),
  );
}