import {
  Controller,
  Post,
  HttpCode,
  Body,
  UseGuards,
  HttpStatus
} from '@nestjs/common'
import { AuthApiGuard } from '../common/guard/auth_api.guard';
import { SystemService } from './system.service'

/**
 * 系统设置
 * 测试第一个控制器
 */
@Controller('/system/config')
export class SystemController {
  constructor(private readonly systemService: SystemService) { }
  // 获取
  @Post()
  @HttpCode(200)
  async findOne(@Body() bodys): Promise<any> {
    const findOneById = await this.systemService.findOneById(bodys.id);
    return findOneById;
  }
}

/**
 * 系统配置信息
 * 测试第二个控制器
 */
@Controller('/api/config')
export class SystemConfigController {
  constructor(private readonly systemService: SystemService) { }
  // 整合接口
  @Post()
  @UseGuards(AuthApiGuard)
  @HttpCode(HttpStatus.OK)
  async findOne(): Promise<any> {
    return await this.systemService.getConfig();
  }
}