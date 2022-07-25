import { Injectable } from '@nestjs/common'
@Injectable()
export class AppService {

  // 获取文字-'Hello World!'
  getHello(): string {
    return 'Hello World!';
  }
}
