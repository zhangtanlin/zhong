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
  async findOne(): Promise<any> {
    return this.versionRepository.find({
      where: {
        id: 1
      }
    })
  }

}
