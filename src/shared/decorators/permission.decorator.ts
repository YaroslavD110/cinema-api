import { SetMetadata } from '@nestjs/common';
import { PermissionNamesType } from '../interfaces/auth.interface';

export const NeededPermissions = (...permissions: PermissionNamesType[]) =>
  SetMetadata('permissions', permissions);
