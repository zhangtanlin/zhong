import { Module } from '@nestjs/common';
import { MsController } from './ms.controller';
import { MsService } from './ms.service';

// 微服务
@Module({
  imports: [],
  controllers: [MsController],
  providers: [MsService],
})
export class MsModule {}
