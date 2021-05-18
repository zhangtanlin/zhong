import {
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/user/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class VersionService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  /**
   * 版本信息
   */
  find(querys): Promise<UserEntity[]> {
    return this.userRepository.find(querys)
  }

}
