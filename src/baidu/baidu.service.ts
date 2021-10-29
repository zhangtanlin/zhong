import { Injectable, HttpException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaiduEntity } from './baidu.entity'
import { Repository, getConnection, Like } from 'typeorm'
import { BaiduGetDto } from './dto/baidu.get.dto'

@Injectable()
export class BaiduService {
  /**
   * 函数
   */
  constructor(
    @InjectRepository(BaiduEntity)
    private readonly baiduRepository: Repository<BaiduEntity>
  ) {}

  /**
   * 分页查询
   */
  async getManyAndCount(params: BaiduGetDto): Promise<any> {
    let data = {
      list: [],
      total: 0
    }
    try {
      const list = await this.baiduRepository.createQueryBuilder('baidu')
        .where({
          id: Like(`%${params.id ? params.id : ''}%`),
          name: Like(`%${params.name ? params.name : ''}%`),
          type: Like(`%${params.type ? params.type : ''}%`)
        })
        .skip((params.currentPage - 1) * params.pageSize || 0)
        .take(params.pageSize || 0)
        .getManyAndCount()
      
      data.list = list[0]
      data.total = list[1]
    } catch (error) {
      throw new HttpException({ error: '获取列表失败' }, 502)
    } finally {
      return data
    }
  }

  /**
   * 根据条件查询一个用户
   */
  async findOne(data: object): Promise<BaiduEntity> {
    const findOneBaidu: BaiduEntity = await this.baiduRepository.findOne(data)
    if (!findOneBaidu) {
      throw new HttpException({ error: '查询失败' }, 502)
    }
    return findOneBaidu
  }

  /**
   * 根据id数组查询数据
   * @param [data] - id数组
   */
  async findByIds(data: any[]): Promise<BaiduEntity[]> {
    const findBaiduArray = await this.baiduRepository
      .createQueryBuilder('baidu')
      .where('baidu.id IN (:...ids)', { ids: data})
      .getMany()
    if (!findBaiduArray) {
      throw new HttpException({ error: '查询列表失败' }, 502)
    }
    return findBaiduArray
  }

  /**
   * 保存
   */
  async save(data): Promise<any> {
    const save = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(BaiduEntity)
      .values(data)
      .execute()
      if (!save) {
        throw new HttpException({ error: '保存角色失败' }, 502)
      }
    return save
  }
}
