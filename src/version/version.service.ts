import {
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { VersionEntity } from './version.entity'

@Injectable()
export class VersionService {
  constructor(
    @InjectRepository(VersionEntity)
    private readonly versionRepository: Repository<VersionEntity>,
  ) { }

  // 版本信息
  findOne(): Promise<VersionEntity> {
    return this.versionRepository.findOne()
  }

}
