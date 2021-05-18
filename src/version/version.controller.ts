import {
  Controller,
  HttpCode,
  Get,
  Param
} from '@nestjs/common'
import { VersionService } from './version.service'

/**
 * 版本信息控制器
 */
@Controller('/api/version')
export class VersionController {
  constructor(private readonly versionService: VersionService) { }
  
  @Get()
  @HttpCode(200)
  async findOne(@Param() params): Promise<any> {
    const findOneById = await this.versionService.find(params.id);
    return findOneById;
  }

}
