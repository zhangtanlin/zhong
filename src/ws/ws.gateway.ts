import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { from, Observable } from 'rxjs';

// socket网关
@WebSocketGateway(
  4000,
  {
    // 解决跨域
    allowEI03: true,
    cros: {
      origin: /.*/,
    },

  }
)
export class WsGateway {
  // socket服务
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('event')
  handleMessage(client: any, payload: any): string {
    console.log(`参数：${payload}`);
    return `socket返回值:${payload}`;
  }
}
