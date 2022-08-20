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
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { AppController, ThirdController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { allEntity } from './common/entity/allEntity'
import { AdminModule } from './admin/admin.module'
import { UploadModule } from './upload/upload.module';
import { VideoModule } from './video/video.module'
import { DownloadModule } from './download/download.module'
import { GuessModule } from './guess/guess.module'
import { AdModule } from './ad/ad.module'
import { LineModule } from './line/line.module'
import { SystemModule } from './system/system.module'
import { SocketModule } from './socket/socket.module';
import { MsModule } from './ms/ms.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis'
@Module({
  imports: [
    /**
     * 环境变量
     * @params isGlobal 是否全局使用
     * @params ignoreEnvFile 是否忽略环境变量文件
     * @params envFilePath 环境变量路径
     */
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      envFilePath: [`./env/.env.${process.env.NODE_ENV}`],
    }),
    // 全局注册typeorm并配置连接参数
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const tempHost = configService.get<string>('MYSQL_HOST')
        const tempPort = configService.get<number>('MYSQL_PORT')
        const tempUser = configService.get<string>('MYSQL_USER')
        const tempPassword = configService.get<string>('MYSQL_PASSWORD')
        const tempName = configService.get<string>('MYSQL_NAME')
        return {
          type: 'mysql',
          host: tempHost,
          port: tempPort,
          username: tempUser,
          password: tempPassword,
          database: tempName,
          entities: allEntity,
          synchronize: true
        };
      },
    }),
    // redis
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): RedisModuleOptions => {
        const tempHost = configService.get<string>('REDIS_HOST')
        const tempPort = configService.get<number>('REDIS_PORT')
        const tempPassword = configService.get<string>('REDIS_PASSWORD')
        const tempName = configService.get<number>('REDIS_NAME')
        return {
          config: {
            host: tempHost,
            port: tempPort,
            password: tempPassword,
            db: tempName,
          }
        };
      },
    }),
    // 系统
    SystemModule,
    // 管理员
    AdminModule,
    // 用户
    UserModule,
    // 上传
    UploadModule,
    // 视频
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
    ThirdController,
  ],
})
export class AppModule { }
