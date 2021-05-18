/**
 * 导入
 * @requires Controller  - nest模块common导出的控制器
 * @requires Post        - nest模块common导出的post请求方式
 * @requires HttpCode    - nest模块common导出的http状态码
 * @requires Body        - nest模块common导出的Body请求参数
 * @requires Headers     - nest模块common导出的Headers请求参数
 * @requires ApiTags     - api文档swagger大类模块
 * @requires ApiResponse - api文档swagger返回值模块
 * @requires UserService - 用户服务模块
 */
import {
  HttpException,
  ForbiddenException,
  Controller,
  Post,
  HttpCode,
  Body,
  Headers,
  UsePipes,
  Get,
  UseGuards,
  Query,
  Delete,
  Param
} from '@nestjs/common'
import { ConfigService } from './config.service'

/**
 * 整合接口控制器
 */
@Controller('/api/config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) { }
  
  /**
   * 整合接口
   * @param params 
   * @returns 
   */
  @Get()
  @HttpCode(200)
  async findOne(@Param() params): Promise<any> {
    const findOneById = await this.configService.find(params.id);
    return findOneById;
  }

}
