import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

// 全局处理成功的数据结构（错误处理是在 filter/error.filter.ts 内处理）
@Injectable()
export class ResultInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    return next.handle().pipe(
      map(data => {
        return {
          data,
          doce: 200,
          message: '请求成功'
        }
      })
    )
  }
}
