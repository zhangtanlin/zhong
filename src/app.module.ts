/**
 * 用户模块引入
 * @requires [Module]        - nest的commom导出的module模块
 * @requires [TypeOrmModule] - nest的typeorm导出的TypeOrmModule模块
 * @requires [AppController] - app控制器
 * @requires [AppService]    - app服务
 * @requires [UserModule]    - 用户模块
 * @requires [allEntity]     - 所有的entity模块【entity组成的数组】
 */
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { allEntity } from './common/entity/allEntity'
import { RedisModule } from 'nestjs-redis'
import { AdminModule } from './admin/admin.module'
import { UploadModule } from './upload/upload.module';
import { VideoModule } from './video/video.module'
import { DownloadModule } from './download/download.module'
import { GuessModule } from './guess/guess.module'
import { AdModule } from './ad/ad.module'
import { LineModule } from './line/line.module'
import { ConfigModule } from './config/config.module'
import { SocketModule } from './socket/socket.module';
import { MsModule } from './ms/ms.module'
import {
  dbHost,
  dbName,
  dbPort,
  dbPwd,
  dbType,
  dbUserName,
  redisDb,
  redisHost,
  redisPort,
  redisPwd,
} from './config'
@Module({
  imports: [
    // 全局注册typeorm并配置连接参数
    TypeOrmModule.forRoot({
      type: dbType,
      host: dbHost,
      port: dbPort,
      username: dbUserName,
      password: dbPwd,
      database: dbName,
      entities: allEntity,
      synchronize: true
    }),
    // redis连接
    RedisModule.register({
      host: redisHost,
      port: redisPort,
      db: redisDb,
      password: redisPwd,
    }),
    // 整合接口
    ConfigModule,
    // 管理员
    AdminModule,
    // 用户
    UserModule,
    // 上传
    UploadModule,
    VideoModule,
    // 下载
    DownloadModule,
    // 竞猜活动
    GuessModule,
    // 广告
    AdModule,
    // 线路
    LineModule,
    // socket
    SocketModule,
    // 微服务
    MsModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ]
})
export class AppModule {}
