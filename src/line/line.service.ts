import { Injectable, HttpException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { LineEntity } from './line.entity'

@Injectable()
export class LineService {
  constructor(
    @InjectRepository(LineEntity)
    private readonly lineRepository: Repository<LineEntity>
  ) { }

  // 查询所有和条数
  async getManyAndCount(): Promise<any> {
    let data = {
      list: [],
      total: 0
    }
    try {
      const list = await this.lineRepository.createQueryBuilder('line')
        .getManyAndCount();
      data.list = list[0]
      data.total = list[1]
    } catch (error) {
      throw new HttpException({ message: '获取列表失败' }, 502)
    } finally {
      return data
    }
  }
}
