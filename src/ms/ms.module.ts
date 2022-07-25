import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { async } from 'rxjs';
import { MS_BASE } from './ms.constants';
import { MsController } from './ms.controller';
import { MsService } from './ms.service';

// 微服务
@Module({
  imports: [
    // 微服务-端口需要和主服务端口保持一致
    ClientsModule.registerAsync([
      {
        name: MS_BASE,
        imports: [ConfigModule,],
        useFactory: async (configService: ConfigService) => {
          const tempHost = await configService.get('MS_PORT')
          return {
            transport: Transport.TCP,
            options: {
              port: tempHost
            },
          }
        },
        inject: [ConfigService],
      }
    ]),
  ],
  controllers: [
    MsController,
  ],
  providers: [
    MsService,
  ],
})
export class MsModule { }
