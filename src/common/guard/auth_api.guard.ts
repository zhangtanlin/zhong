import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { RedisService } from 'nestjs-redis'
import * as CryptoJS from 'crypto-js'
import { passwordKey } from '../config'

@Injectable()
export class AuthApiGuard implements CanActivate {
  /**
   * 私有方法注册
   * @param redisService - redis服务注册
   */
  constructor(private readonly redisService: RedisService) { }

  /**
   * @param [redisClient]      - 连接redis的服务
   * @param [request]          - 客户端请求参数
   * @param [token]            - 客户端的authorization值
   * @param [decryptToken]     - 服务端解密token【解密后的值是字符串】
   * @param [decryptTokenJSON] - 服务端把字符串转换成json格式
   * @param [decryptTokenName] - 服务端获取token解密后的name
   */
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const redisClient = this.redisService.getClient()
    const request = context.switchToHttp().getRequest()
    const token = request.headers.authorization
    if (request.url !== '/api/user/login') {
      try {
        const decryptToken = CryptoJS.AES.decrypt(token, passwordKey).toString(
          CryptoJS.enc.Utf8
        )
        const decryptTokenJSON = JSON.parse(decryptToken)
        const decryptTokenName = decryptTokenJSON.name
        const getRedisToken = redisClient.get(decryptTokenName + ':token')
        if (!getRedisToken) {
          return false
        }
        return true
      } catch (error) {
        throw new HttpException({ error: '暂无权限' }, 401)
      }
    }
    return true
  }
}
