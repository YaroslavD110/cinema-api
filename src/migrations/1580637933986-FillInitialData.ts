import 'dotenv/config';

import { plainToClass } from 'class-transformer';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

import { IPermission } from '../shared/interfaces/auth.interface';
import { User } from './../entities/user.entity';
import { Permission } from './../entities/permission.entity';

export class FillInitialData1580637933986 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
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

    const createdPermissions = await queryRunner.manager
      .getRepository<Permission>(Permission)
      .save(plainToClass(Permission, permissions));

    const adminUser = new User();

    adminUser.username = 'YaroD';
    adminUser.firstName = 'Yaroslav';
    adminUser.lastName = 'D';
    adminUser.email = 'yaroslav.d110@gmail.com';
    adminUser.salt = await genSalt(parseInt(process.env.SALT_LENGTH));
    adminUser.password = await hash('12345', adminUser.salt);
    adminUser.sessions = [];
    adminUser.permissions = createdPermissions;

    await queryRunner.manager.getRepository<User>(User).save(adminUser);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
