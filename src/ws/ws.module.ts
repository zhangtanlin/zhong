import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';

// socket模型
@Module({
  providers: [
    WsGateway,
  ]
})
export class WsModule {}
