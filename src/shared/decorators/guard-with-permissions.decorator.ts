import { PermissionsGuard } from './../auth.guard';
import { NeededPermissions } from './permission.decorator';
import { PermissionNamesType } from '../interfaces/auth.interface';
import { applyDecorators, UseGuards } from '@nestjs/common';

export function GuardWithPermissions(...permissions: PermissionNamesType[]) {
  return applyDecorators(
    NeededPermissions(...permissions),
    UseGuards(PermissionsGuard)
  );
}
