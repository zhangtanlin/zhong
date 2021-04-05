/**
 * 导入
 * @module [Module]         - nest的common模块内的module方法
 * @module [TypeOrmModule]  - typeorm内置方法【作用待定】
 * @module [LineService]    - 模块的服务
 * @module [LineController] - 模块的控制器
 * @module [LineEntity]     - 模块的entity（参考：https://typeorm.io/#/entities）
 */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LineService } from "./line.service";
import { LineController } from "./line.controller";
import { LineEntity } from "./line.entity";

@Module({
  imports: [
    /**
     * 连接下载表
     */
    TypeOrmModule.forFeature([LineEntity])
  ],
  providers: [LineService],
  controllers: [LineController],
  exports: [LineService]
})
export class LineModule {}
