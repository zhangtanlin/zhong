import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // let now = Date.now();
    // console.log(`拦截之前的时间=${now}`)
    return next.handle();
    // return next.handle().pipe(
    //   tap(() => console.log(`拦截之后的时间=${Date.now()}`))
    // );
  }
}
