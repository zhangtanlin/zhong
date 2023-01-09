import {
  Controller,
  Post,
  HttpCode,
  Headers,
  Body,
  UseGuards,
  HttpStatus,
  HttpException
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
  async findOne(@Headers() headers: any,): Promise<any> {
    const _id = headers.authorization.id;
    if (!_id) {
      throw new HttpException(
        { message: '当前id不存在' },
        502,
      );
    }
    const res = await this.systemService.getIntegration(_id); 
    return res;
  }
}