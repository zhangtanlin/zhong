import { Injectable } from '@nestjs/common'
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { port } from './common/config';

@Injectable()
export class AppService {

  // 主项目的微服务（主程序的微服务【端口和主程序保持一致】）
  @Client({ transport: Transport.TCP, options: { port: port } })
  private basecClient: ClientProxy;

  getHello(): string {
    return 'Hello World!';
  }

  // 主程序的微服务测试
  msBaseTest(text: string): Observable<string> {
    return from(this.basecClient.send<string>({ ms: 'baseMs' }, text));
  }
}



















