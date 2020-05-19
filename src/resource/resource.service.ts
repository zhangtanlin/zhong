import { Injectable, HttpException, Inject, forwardRef } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ResourceEntity } from './entity/resource.entity'
import { Repository } from 'typeorm'
import { ResourceAddDto } from './dto/resource.add.dto'
import { ResourceObjectDto } from './dto/resource.object.dto'

@Injectable()
export class ResourceService {
  /**
   * 函数
   * @class [ResourceEntity] - 资源数据结构
   * @class [UserService]    - 用户服务
   */
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly resourceRepository: Repository<ResourceEntity>
  ) {}

  /**
   * 查询所有
   */
  async find(): Promise<ResourceEntity[]> {
    const findResourceArray = await this.resourceRepository.find()
    if (!findResourceArray) {
      throw new HttpException({ error: '查询列表失败' }, 502)
    }
    return findResourceArray
  }

  /**
   * 根据制定条件查询
   * @param {object} data - 资源列表条件【注意是对象】
   */
  async findByObjCondition(data: ResourceObjectDto): Promise<ResourceEntity[]> {
    const findResourceArray = await this.resourceRepository.find(data)
    if (!findResourceArray) {
      throw new HttpException({ error: '查询列表失败' }, 502)
    }
    return findResourceArray
  }

  /**
   * 根据id数组查询数据
   * @param [data] - id数组
   */
  async findByArrId(data: any[]): Promise<ResourceEntity[]> {
    const findResourceArray = await this.resourceRepository
      .createQueryBuilder('resource')
      .where('resource.id IN (:...ids)', { ids: data})
      .getMany()
    if (!findResourceArray) {
      throw new HttpException({ error: '查询列表失败' }, 502)
    }
    return findResourceArray
  }

  /**
   * 保存
   */
  async save(data: ResourceAddDto): Promise<ResourceEntity> {
    try {
      const save: ResourceEntity = await this.resourceRepository.save(data)
      if (!save) {
        throw new HttpException({ error: '存储失败' }, 502)
      }
      return save
    } catch (error) {
      throw error
    }
  }

  /**
   * 更新一条数据
   * @param {number} [id]           - 查询需要更新的数据id
   * @param {ResourceObjDto} [data] - 需要更新的数据对象
   */
  async updateOneById(id: number, data: ResourceObjectDto): Promise<any> {
    try {
      const update: any = await this.resourceRepository.update(id, data)
      if (!update) {
        throw new HttpException({ error: '存储失败' }, 502)
      }
      return update
    } catch (error) {
      throw error
    }
  }
}
