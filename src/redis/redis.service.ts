// import { Injectable } from '@nestjs/common';
// import { createClient } from 'redis';

// @Injectable()
export class RedisService {
  // private readonly client = createClient({
  //   host: '127.0.0.1',
  //   port: 6379,
  //   db: 0,
  // });

  /**
   * 向redis里面添加数据
   * @param key     redis的键名
   * @param seconds 过期时间，单位为秒
   * @param value   redis的值
   */
  // async setex(key: string, seconds: number, value: string): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     this.client.setex(key, seconds, value, (err, result) => {
  //       if (err) {
  //         reject(false);
  //       }
  //       resolve(true);
  //     });
  //   });
  // }

/**
 * 获取redis里面的指定数据
 * @param key redis的键名
 */
  // async get(key: string): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.client.get(key, (err, result) => {
  //       if (err) {
  //         reject(false);
  //       }
  //       resolve(result);
  //     });
  //   });
  // }
}
