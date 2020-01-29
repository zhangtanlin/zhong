import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger
} from "@nestjs/common";

@Catch()
export class ErrorFilter<T> implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    // 状态码
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // 提示信息
    const message = {
      status,
      message: exception.message.error,
      timestamp: new Date().toISOString(),
      path: request.url
    };
    // 记录日志
    Logger.log("错误提示", JSON.stringify(message));
    // 设置返回信息
    response.status(status).json(message);
  }
}
