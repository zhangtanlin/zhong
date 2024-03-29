import {
  Controller,
  HttpCode,
  Param,
  Post,
  UseGuards
} from '@nestjs/common'
import { AuthApiGuard } from '../common/guard/auth_api.guard';
import { VersionService } from './version.service'

/**
 * 版本信息控制器
 */
@Controller('/api/version')
export class VersionController {
  constructor(private readonly versionService: VersionService) { }
  
  @Post()
  @HttpCode(200)
  @UseGuards(AuthApiGuard)
  async find(@Param() params): Promise<any> {
    const findOneById = await this.versionService.findOne();
    return findOneById;
  }

}
