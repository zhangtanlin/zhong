import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MsService } from './ms.service';

// 微服务
@Controller()
export class MsController {
  constructor(private readonly msService: MsService) {}

  // 微服务调用名字{{ ms: 'baseMs' }}
  @MessagePattern({ ms: 'baseMs' })
  setWord(text: string): string {
    return this.msService.setText(text);
  }
}
