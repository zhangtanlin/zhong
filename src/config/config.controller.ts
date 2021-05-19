import {
  Controller,
  HttpCode,
  Param,
  Post,
  UseGuards
} from '@nestjs/common'
import { AuthApiGuard } from 'src/common/guard/auth_api.guard';
import { ConfigService } from './config.service'

// 整合接口
@Controller('/api/config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) { }
  
  // 整合接口
  @Post()
  @HttpCode(200)
  @UseGuards(AuthApiGuard)
  async findOne(@Param() params): Promise<any> {
    const findOneById = await this.configService.get(params);
    return findOneById;
  }

}
