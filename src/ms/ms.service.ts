import { Injectable } from '@nestjs/common';

// 微服务
@Injectable()
export class MsService {
  
  // 微服务操作
  setText(text: string): string {
    return `写入:${text}`;
  }
}
