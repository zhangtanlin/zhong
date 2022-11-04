/**
 * 导入
 * @module [Module]         - nest的common模块内的module方法
 * @module [TypeOrmModule]  - typeorm内置方法【作用待定】
 * @module [UserService]    - 模块的服务
 * @module [UserController] - 模块的控制器
 * @module [User]           - 模块的entity（参考：https://typeorm.io/#/entities）
 */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DownloadService } from "./download.service";
import { DownloadController } from "./download.controller";
import { DownloadEntity } from "./download.entity";

@Module({
  imports: [
    /**
     * 连接下载表
     */
    TypeOrmModule.forFeature([DownloadEntity])
  ],
  providers: [DownloadService],
  controllers: [DownloadController],
  exports: [DownloadService]
})
export class DownloadModule {}
