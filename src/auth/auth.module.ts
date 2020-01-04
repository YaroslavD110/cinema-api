import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserModule } from './../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PermissionService } from './permission.service';
import { Permission } from '../entities/permission.entity';
import { Session } from '../entities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Session, Permission]), UserModule],
  controllers: [AuthController],
  providers: [AuthService, PermissionService],
  exports: [AuthService]
})
export class AuthModule {}
