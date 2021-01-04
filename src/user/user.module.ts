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
@Module({
  imports: [
    /**
     * 连接用户表
     */
    TypeOrmModule.forFeature([UserEntity]),
    RoleModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
