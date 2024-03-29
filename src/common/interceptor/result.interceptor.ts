import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { privateDecryptFn, privateSignFn, publicEncryptFn, publicVerifyFn } from '../utils/cryptoData'

/**
 * 全局处理成功的数据结构
 * 扩展:错误处理是在 filter/error.filter.ts 文件内处理。
 * 注意:这里状态码使用的是 code 是为了和 http 请求的 status 进行区分。
 */
@Injectable()
export class ResultInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 获取上下文
    const ctx = context.switchToHttp()
    // 获取请求体
    const request = ctx.getRequest()
    // 获取返回体
    const response = ctx.getResponse()
    // 使用管道包装返回值
    return next.handle().pipe(
      map(async data => {
        // 加密返回数据
        // console.log("加密之前", data);
        const tempEncryptData = await publicEncryptFn(
          data
        );
        // console.log("加密之后", tempEncryptData);
        const tempDecrypt = await privateDecryptFn(
          tempEncryptData,
        );
        // console.log("解密之后", tempDecrypt);
        // 获取返回信息
        const code = response.statusCode // 状态码
        const message = '请求成功' // 返回提示
        // 拼装信息
        const buildMsg = {
          code,
          message,
          data,
        }
        return buildMsg
      })
    )
  }
}
