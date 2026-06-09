import { SetMetadata } from '@nestjs/common';

import { NombreRol } from '../../rol/entities/rol.entity';

export const ROLES_KEY = 'roles';

export const Roles = (
  ...roles: NombreRol[]
) => SetMetadata(
  ROLES_KEY,
  roles,
);