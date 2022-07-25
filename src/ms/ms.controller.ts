import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { MsKeyDto } from './dto/ms.key.dto';
import { MS_BASE } from './ms.constants';
import { MsService } from './ms.service';

// 微服务
@Controller('/ms')
export class MsController {
  constructor(
    private readonly msService: MsService,
    @Inject(MS_BASE)
    private readonly client: ClientProxy,
  ) { }

  // 微服务-请求消息
  @Post()
  execute(@Body() bodys: MsKeyDto): Observable<number[]> {
    const data: number[] = [1, 2, 3, 4, 5]
    return from(this.client.send<number[]>(bodys, data))
  }

  // 微服务-处理请求{ ms: 'ms_send' }
  @MessagePattern({ ms: 'ms_send' })
  ms_send(data: number[]): number {
    return this.msService.countArr(data);
  }
}
