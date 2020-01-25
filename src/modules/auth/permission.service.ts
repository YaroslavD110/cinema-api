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
  ) {
    this.addInitialPermissions();
  }

  private async addInitialPermissions() {
    const permissionsNumber = await this.permissionRepository.count();

    if (!permissionsNumber) {
      const permissions: IPermission[] = [
        {
          name: 'read_general',
          description: 'Ability to read general data',
          user: []
        },
        {
          name: 'write_general',
          description: 'Ability to write general data',
          user: []
        },
        {
          name: 'delete_general',
          description: 'Ability to delete general data',
          user: []
        },
        {
          name: 'read_system',
          description: 'Ability to read system data',
          user: []
        },
        {
          name: 'write_system',
          description: 'Ability to write system data',
          user: []
        },
        {
          name: 'delete_system',
          description: 'Ability to delete system data',
          user: []
        },
        {
          name: 'admin_access',
          description: 'Access to admin panel',
          user: []
        }
      ];

      this.permissionRepository.save(plainToClass(Permission, permissions));
    }
  }

  public getById(id: string) {
    return this.permissionRepository.findOne(id);
  }

  public getByName(name: PermissionNamesType) {
    return this.permissionRepository.findOne({ where: { name } });
  }
}
