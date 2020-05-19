/**
 * 导入
 * @module [Module]          - nest的common模块内的module方法
 * @module [TypeOrmModule]   - typeorm内置方法【作用待定】
 * @module [GuessService]    - 模块的服务
 * @module [GuessController] - 模块的控制器
 * @module [GuessEntity]     - 模块的entity（参考：https://typeorm.io/#/entities）
 */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GuessService } from "./guess.service";
import { GuessController } from "./guess.controller";
import { GuessEntity } from "./entity/guess.entity";

@Module({
  imports: [
    /**
     * 连接下载表
     */
    TypeOrmModule.forFeature([GuessEntity])
  ],
  providers: [GuessService],
  controllers: [GuessController],
  exports: [GuessService]
})
export class GuessModule {}
