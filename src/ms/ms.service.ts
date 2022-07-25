import { Injectable, NotImplementedException } from '@nestjs/common';

// 微服务
@Injectable()
export class MsService {

  // 累加数组内的所有值
  countArr(data: number[]): number {
    try {
      const tempNumber = (data || []).reduce((a, b) => a + b)
      return tempNumber
    } catch (error) {
      throw new NotImplementedException({ message: '服务器无法处理当前方法' })
    }
  }
}
