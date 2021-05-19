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
import { VersionModule } from './version/version.module'
@Module({
  imports: [
    /**
     * @require [TypeOrmModule]  - 全局注册typeorm并配置连接参数
     * @require [RedisModule]    - redis连接
     * @require [ConfigModule]   - 整合接口
     * @require [AdminModule]    - 管理员
     * @require [UserModule]     - 用户
     * @require [UploadModule]   - 上传
     * @require [DownloadModule] - 下载
     * @require [GuessModule]    - 竞猜活动
     * @require [AdModule]       - 广告
     * @require [LineModule]     - 线路
     * @require [VersionModule]  - 版本
     */
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'website',
      entities: allEntity,
      synchronize: true
    }),
    RedisModule.register({
      url: 'redis://:@127.0.0.1:6379/0'
    }),
    ConfigModule,
    AdminModule,
    UserModule,
    UploadModule,
    VideoModule,
    DownloadModule,
    GuessModule,
    AdModule,
    LineModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
