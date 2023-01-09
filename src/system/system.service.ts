import {
  Body,
  HttpException,
  Injectable,
} from '@nestjs/common'
import { Repository } from 'typeorm'
import { AdEntity } from '../ad/ad.entity'
import { AdService } from '../ad/ad.service'
import { UserEntity } from '../user/user.entity'
import { UserService } from '../user/user.service'
import { VersionEntity } from '../version/version.entity'
import { VersionService } from '../version/version.service'
import { SystemConfigEntity } from './system.config.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { classToPlain } from 'class-transformer'

@Injectable()
export class SystemService {
  constructor(
    // 系统配置信息
    @InjectRepository(SystemConfigEntity)
    private readonly systemConfigRepository: Repository<SystemConfigEntity>,
    private readonly userService: UserService,
    private readonly versionService: VersionService,
    private readonly adService: AdService,
  ) { }

  // 查询用户【根据query条件】
  async findOneById(@Body() bodys): Promise<any> {
    const findOneById: UserEntity = await this.userService.findOneById(bodys.id);
    return classToPlain(findOneById);
  }

  // 获取整合接口
  async getIntegration(id: number): Promise<any> {
    let cb = {
      version: {},
      userInfo: {},
      config: {},
      ads: []
    };
    try {
      // 版本信息
      const _versionEntity: VersionEntity = await this.versionService.findOne();
      cb.version = _versionEntity;
      if (!_versionEntity) {
        throw new HttpException(
          { message: '版本信息查询失败' },
          502,
        );
      };
      // 用户信息
      const _userInfo = await this.userService.findOneById(id);
      if (!_userInfo) {
        throw new HttpException(
          { message: '当前用户不存在' },
          502,
        );
      };
      cb.userInfo = _userInfo;
      // 配置信息
      cb.config = await this.getConfig();
      // 广告
      const _adEntity: AdEntity[] = await this.adService.getManyAndCount(
        { type: 1 }
      );
      if (!_adEntity) {
        throw new HttpException(
          { message: '请求广告失败' },
          502,
        );
      }
      cb.ads = _adEntity;
      return cb;
    } catch (error) {
      throw new HttpException({ message: error.response }, error.status)
    }
  }

  // 配置信息
  async getConfig(): Promise<any> {
    try {
      const res = await this.systemConfigRepository.findOneBy({
        id: 1,
      });
      if (!res) {
        throw new HttpException(
          { message: '当前id不存在数据库中' },
          502,
        );
      }
      return res;
    } catch (error) {
      throw new HttpException(
        { message: error.response },
        error.status,
      );
    }
  }
}
