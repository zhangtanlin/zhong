import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

// socket模型
@Module({
  providers: [
    SocketGateway,
  ]
})
export class SocketModule {}
