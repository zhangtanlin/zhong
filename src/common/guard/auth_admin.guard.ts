import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
} from '@nestjs/common'
import { RedisService } from 'nestjs-redis'
import * as CryptoJS from 'crypto-js'
import { passwordKey } from '../config'

// 管理系统-守卫
@Injectable()
export class AuthAdminGuard implements CanActivate {
  /**
   * 私有方法注册
   * @param redisService - redis服务注册
   */
  constructor(private readonly redisService: RedisService) { }

  /**
   * 自定义权限验证
   * @param    [context]       - 上下文（获取客户端参数）
   * @todo     [redisClient]   - 连接redis
   * @todo     [request]       - 获取客户端请求体
   * @todo     [token]         - 客户端的authorization值
   * @todo     [decryptToken]  - 服务端解密token【解密后的值是字符串】
   * @todo     [tokenJSON]     - 服务端把字符串转换成json格式
   * @todo     [account]       - 解密客户端token后的name
   * @function [getRedisToken] - 根据用户名组装key查询redis内存储的token
   * @returns boolean | Promise<boolean> | Observable<boolean> 
   * @description 注意如果函数使用 async 标注的话返回值要使用对应的 Promise
   */
  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const redisClient = this.redisService.getClient()
    const request = context.switchToHttp().getRequest()
    const token = request.headers.authorization
    if (request.url !== '/admin/user/login') {
      try {
        const decryptToken = CryptoJS.AES.decrypt(token, passwordKey).toString(
          CryptoJS.enc.Utf8
        )
        const tokenJSON = JSON.parse(decryptToken)
        const account = tokenJSON.account
        const getRedisToken = await redisClient.get(account + ':token')
        if (!!getRedisToken) {
          return true
        }
        return false
      } catch (error) {
        throw new HttpException({ error: '暂无权限' }, 401)
      }
    }
    return true
  }
}
