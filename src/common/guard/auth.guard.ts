import { CanActivate, ExecutionContext, Injectable, HttpException } from "@nestjs/common";
import { Observable } from "rxjs";
import { RedisService } from "nestjs-redis";
import * as CryptoJS from 'crypto-js'
import PasswordKey from '../key/passwordKey'

@Injectable()
export class AuthGuard implements CanActivate {

  /**
   * 私有方法注册
   * @param redisService - redis服务注册
   */
  constructor (
    private readonly redisService: RedisService,
  ) {}

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
    // const client = this.redisService.getClient();
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;    
    if(request.url !== '/user/login'){
      try {
        var decryptToken  = CryptoJS.AES.decrypt(token, PasswordKey).toString(CryptoJS.enc.Utf8);
        let decryptTokenJSON = JSON.parse(decryptToken);
        let decryptTokenName = decryptTokenJSON.name;
        return true;
      } catch (error) {
        throw new HttpException({error: '暂无权限'}, 401)
      }
    }
    return true;
  }
}
