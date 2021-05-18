import {
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/user/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  /**
   * 查询用户【根据query条件】
   */
  find(querys): Promise<UserEntity[]> {
    return this.userRepository.find(querys)
  }

}
