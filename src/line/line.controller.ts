/**
 * 导入
 * @requires Controller  - nest模块common导出的控制器
 * @requires Post        - nest模块common导出的post请求方式
 * @requires HttpCode    - nest模块common导出的http状态码
 * @requires Body        - nest模块common导出的Body请求参数
 * @requires Headers     - nest模块common导出的Headers请求参数
 */
import {
  HttpException,
  Controller,
  HttpCode,
  UsePipes,
  Headers,
  Get,
  Body,
  Param,
  Query,
} from '@nestjs/common'
import { LineService } from './line.service'
import { DtoPipe } from '../common/pipe/dto.pipe'
import { ResultDto } from '../common/dto/result.dto'
import { LineGetDto } from './dto/line.get.dto'

/**
 * 竞猜活动控制器
 */
@Controller('/api/line')
export class LineController {
  /**
   * @function [constructor] - 类中定义的构造函数
   * @param    [private]     - 修饰的属性或方法是私有的，不能在声明它的类的外部访问
   * @param    [readonly]    - 表示属性或方法只能使用不能修改
   * @param    [lineService] - 服务别名
   * @class    [LineService] - 服务
   */
  constructor(private readonly lineService: LineService) {}
  /**
   * 请求列表
   * @param     [Get]        - 请求方式
   * @param     [UsePipes]   - 管道验证
   * @class     [DtoPipe]    - 自己写的管道验证器【和DownloadGetDto配合使用】
   * @param     [HttpCode]   - 请求返回状态码
   * @faunction [Body]       - nest提供的获取Body参数的方法
   * @faunction [Query]      - query参数
   * @faunction [UserGetDto] - 用以验证Body参数正确与否的dto方法
   * @returns   {ResultDto}  - 返回值是一个含有提示信息的对象
   */
  @Get()
  @UsePipes(DtoPipe)
  @HttpCode(200)
  async get(@Headers() headersArgument: any, @Query() querys: LineGetDto): Promise<ResultDto> {
    let cb: ResultDto = {
      code: 200,
      data: null,
      message: '成功'
    }
    try {
      cb.data = await this.lineService.getManyAndCount(querys)
    } catch (error) {
      cb.code = error.status;
      cb.message = error.message.error;
    } finally {
      return cb
    }
  }
}
