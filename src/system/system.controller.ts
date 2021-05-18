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
import { SystemService } from './system.service'

/**
 * 系统设置控制器
 */
@Controller('/api/system')
export class SystemController {
  constructor(private readonly SystemService: SystemService) { }
  
  /**
   * 获取
   * @param params 
   * @returns 
   */
  @Get()
  @HttpCode(200)
  async findOne(@Param() params): Promise<any> {
    const findOneById = await this.SystemService.find(params.id);
    return findOneById;
  }

}
