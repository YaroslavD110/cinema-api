import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';

import { Permission } from '../../entities/permission.entity';
import {
  IPermission,
  PermissionNamesType
} from '../../shared/interfaces/auth.interface';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) {}

  public getById(id: string) {
    return this.permissionRepository.findOne(id);
  }

  public getByName(name: PermissionNamesType) {
    return this.permissionRepository.findOne({ where: { name } });
  }
}
