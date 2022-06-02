import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { wsPort } from 'src/config';

// socket网关
@WebSocketGateway(
  wsPort,
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
    console.log(`参数：${payload}`);
    return `socket返回值:${payload}`;
  }
}