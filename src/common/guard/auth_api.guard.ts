import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { ConfigService } from '@nestjs/config'
import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { AES, enc } from 'crypto-js'
import Ioredis from 'ioredis'

// api接口-守卫
@Injectable()
export class AuthApiGuard implements CanActivate {
  /**
   * 私有方法注册
   * @param redisService - redis服务注册
   */
  constructor(
    private readonly configService: ConfigService,
    @InjectRedis()
    private readonly ioredis: Ioredis,
  ) { }

  /**
   * @param [request]          - 客户端请求参数
   * @param [token]            - 客户端的authorization值
   * @param [decryptToken]     - 服务端解密token【解密后的值是字符串】
   * @param [decryptTokenJSON] - 服务端把字符串转换成json格式
   * @param [decryptTokenName] - 服务端获取token解密后的name
   */
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const _authInfo = request.headers.authorization
    if (request.url !== '/api/login') {
      try {
        const decryptToken = AES.decrypt(
          _authInfo,
          this.configService.get('TOKEN_KEY'),
        ).toString(
          enc.Utf8
        );
        const tokenJSON = JSON.parse(decryptToken)
        request.headers.authorization = tokenJSON
        return true
      } catch (error) {
        throw new HttpException({ error: '暂无权限' }, 401)
      }
    }
    return true
  }
}
