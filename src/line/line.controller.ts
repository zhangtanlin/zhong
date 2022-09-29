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
  UseGuards,
  Post,
} from '@nestjs/common'
import { LineService } from './line.service'
import { DtoPipe } from '../common/pipe/dto.pipe'
import { ResultDto } from '../common/dto/result.dto'
import { AuthApiGuard } from '../common/guard/auth_api.guard'

/**
 * 控制器
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
  constructor(private readonly lineService: LineService) { }
  /**
   * 请求列表
   * @param Post         - 请求方式
   * @param UsePipes     - 管道验证
   * @class DtoPipe      - 自己写的管道验证器【和Dto配合使用】
   * @param HttpCode     - 请求返回状态码
   * @param AuthApiGuard - 权限验证
   */
  @Post()
  @UsePipes(DtoPipe)
  @HttpCode(200)
  @UseGuards(AuthApiGuard)
  async get(): Promise<any> {
    return await this.lineService.getManyAndCount()
  }

  /**
   * 验证线路
   * @param  Post     - 请求方式
   * @param  UsePipes - 管道验证
   * @class  DtoPipe  - 自己写的管道验证器【和Dto配合使用】
   * @param  HttpCode - 请求返回状态码
   */
  @Post('/verify')
  @UsePipes(DtoPipe)
  @HttpCode(200)
  @UseGuards(AuthApiGuard)
  async verify(): Promise<any> {
    return '成功';
  }
}
