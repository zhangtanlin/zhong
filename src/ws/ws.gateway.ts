import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server } from 'http';
import { from, Observable } from 'rxjs';

// socket网关
@WebSocketGateway(
  4000,
  {
    cros: true,
  }
)
export class WsGateway {
  // socket服务
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('event')
  handleMessage(client: any, payload: any): Observable<string> {
    console.log(`参数：${payload}`);
    return from("socket返回值");
  }
}
