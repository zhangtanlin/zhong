import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';

// socket网关
@WebSocketGateway(
  5000,
  {
    // 解决跨域
    allowEI03: true,
    cros: {
      origin: "*",
    },

  }
)
export class SocketGateway {
  // socket服务
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('event')
  handleMessage(client: any, payload: any): string {
    return `socket返回值:${payload}`;
  }
}
