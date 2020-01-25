import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken';

import { AuthService } from '../modules/auth/auth.service';
import { PermissionNamesType, IPayload } from './interfaces/auth.interface';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector
  ) {}

  private readonly unauthMessage = 'Unauthorized access!';

  private async validateToken(authHeader: string) {
    const token = authHeader.split('Bearer')[1].trim();

    if (!token) {
      throw new HttpException(this.unauthMessage, HttpStatus.UNAUTHORIZED);
    }

    try {
      return await verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new HttpException(this.unauthMessage, HttpStatus.UNAUTHORIZED);
    }
  }

  public async canActivate(context: ExecutionContext) {
    return true;

    // const handler = context.getHandler();
    // const request = context.switchToHttp().getRequest();
    // const permissions = this.reflector.get<PermissionNamesType[]>(
    //   'permissions',
    //   handler
    // );

    // if (!request.headers.authorization) {
    //   return false;
    // }

    // const payload = (await this.validateToken(
    //   request.headers.authorization
    // )) as IPayload;
    // const user = await this.authService.validateUser(payload);

    // if (!user) {
    //   return false;
    // }

    // request.user = user;

    // if (!permissions) {
    //   return true;
    // }

    // const availablePermissions = user.permissions.map(({ name }) => name);

    // return (
    //   permissions.filter(
    //     permission => !availablePermissions.includes(permission)
    //   ).length === 0
    // );
  }
}
