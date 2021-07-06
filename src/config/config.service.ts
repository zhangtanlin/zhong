import {
  HttpException,
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AdEntity } from 'src/ad/ad.entity'
import { AdService } from 'src/ad/ad.service'
import { UserEntity } from 'src/user/user.entity'
import { UserService } from 'src/user/user.service'
import { VersionEntity } from 'src/version/version.entity'
import { VersionService } from 'src/version/version.service'
import { Repository } from 'typeorm'
import { ConfigEntity } from './config.entity'

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(ConfigEntity)
    private readonly configRepository: Repository<ConfigEntity>,
    private readonly userService: UserService,
    private readonly versionService: VersionService,
    private readonly adService: AdService,
  ) { }

  // 获取整合接口
  async get(param): Promise<any> {
    var cb = {
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
        throw new HttpException('版本信息查询失败', 502);
      }
      // 用户信息

      // 配置信息
      cb.config = await this.getConfig();
      // 广告
      const _adEntity: AdEntity[] = await this.adService.getManyAndCount({type: 1});
      cb.ads = _adEntity;
      return cb;
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  // 配置信息
  async getConfig(): Promise<any> {
    var cb: ConfigEntity = {
      id: '',
      devApi: '',
      api: '',
      githubApi: '',
      tfApi: '',
      tfGithubApi: '',
      imageHost: "",
      uploadImageKey: "",
      uploadImageUrl: "",
      uploadVideoKey: "",
      uploadVideoUrl: "",
    };
    try {
      cb = await this.configRepository.findOne();
      return cb;
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }
}
