<<<<<<< HEAD
/**
 * 导入
 * @module [Module]         - nest的common模块内的module方法
 * @module [TypeOrmModule]  - typeorm内置方法【作用待定】
 * @module [UserService]    - 用户模块的服务
 * @module [UserController] - 用户模块的控制器
 * @module [User]           - 用户模块的entity（参考：https://typeorm.io/#/entities）
 */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserEntity } from "./user.entity";
import { RoleModule } from "../role/role.module";
=======
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceEntity } from 'src/resource/resource.entity';
import { ResourceService } from 'src/resource/resource.service';
import { RoleEntity } from 'src/role/role.entity';
import { RoleModule } from '../role/role.module';
import { RoleService } from '../role/role.service';
import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

>>>>>>> 1f5ae6d353d3cb15a2e6e4d94fcaf3bb131d9a70
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([RoleEntity]),
    TypeOrmModule.forFeature([ResourceEntity]),
    RoleModule
  ],
  providers: [UserResolver, UserService, RoleService, ResourceService]
})
export class UserModule { }
