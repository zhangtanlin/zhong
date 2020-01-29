/**
 * 用户模块引入
 * @requires [Module]        - nest的commom导出的module模块
 * @requires [TypeOrmModule] - nest的typeorm导出的TypeOrmModule模块
 * @requires [AppController] - app控制器
 * @requires [AppService]    - app服务
 * @requires [UserModule]    - 用户模块
 * @requires [allEntity]     - 所有的entity模块【entity组成的数组】
 */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { allEntity } from "./common/entity/importEntity";
import { RedisModule } from "nestjs-redis";

@Module({
  imports: [
    /**
     * @require [TypeOrmModule] - 全局注册typeorm并配置连接参数
     * @require [RedisModule]   - redis连接
     * @require [UserModule]    - 用户
     */
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "123456",
      database: "website",
      entities: allEntity,
      synchronize: true
    }),
    RedisModule.register({
      url: "redis://:@127.0.0.1:6379/0"
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
