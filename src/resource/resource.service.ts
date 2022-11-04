import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ResourceEntity } from './resource.entity'
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
      throw new HttpException({ message: '查询列表失败' }, 502)
    }
    return findResourceArray
  }

  /**
   * 根据制定条件查询
   * @param {object} data - 资源列表条件【注意是对象】
   */
  async findByObjCondition(data: ResourceObjectDto): Promise<ResourceEntity[]> {
    const findResourceArray = await this.resourceRepository.find({
      where: data
    })
    if (!findResourceArray) {
      throw new HttpException({ message: '查询列表失败' }, 502)
    }
    return findResourceArray
  }

  /**
   * 根据id数组查询数据
   * @param [data] - id数组
   */
  async findByArrIds(data: any[]): Promise<ResourceEntity[]> {
    const findResourceArray = await this.resourceRepository
      .createQueryBuilder('resource')
      .where('resource.id IN (:...ids)', { ids: data })
      .getMany()
    if (!findResourceArray) {
      throw new HttpException({ message: '查询列表失败' }, 502)
    }
    return findResourceArray
  }

  /**
   * 根据id数值查询数据
   * @param id 资源id
   */
  async findByArrId(id: number): Promise<ResourceEntity> {
    const findResource = await this.resourceRepository
      .createQueryBuilder('resource')
      .where("resource.id = :id", { id })
      .getOne()
    if (!findResource) {
      throw new HttpException({ message: '查询列表失败' }, 502)
    }
    return findResource;
  }

  /**
   * 保存
   */
  async save(data: ResourceAddDto): Promise<ResourceEntity> {
    const findOneByName: ResourceEntity = await this.resourceRepository.findOneBy({
      name: data.name,
    });
    if (findOneByName) {
      throw new HttpException({ message: '资源名重复' }, HttpStatus.FORBIDDEN);
    }
    const findOneByAlias: ResourceEntity = await this.resourceRepository.findOneBy({
      alias: data.alias,
    });
    if (findOneByAlias) {
      throw new HttpException({ message: '资源别名重复' }, HttpStatus.FORBIDDEN);
    }
    const findOneByAddress: ResourceEntity = await this.resourceRepository.findOneBy({
      target: data.target,
    });
    if (findOneByAddress) {
      throw new HttpException({ message: '资源地址重复' }, HttpStatus.FORBIDDEN);
    }
    const resource = new ResourceEntity(); // 初始化User
    resource.name = data.name;
    resource.alias = data.alias;
    resource.target = data.target;
    const save: ResourceEntity = await this.resourceRepository.save(resource);
    if (!save) {
      throw new HttpException({ message: '插入数据库失败' }, HttpStatus.FORBIDDEN);
    }
    return save;
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
        throw new HttpException({ message: '存储失败' }, 502)
      }
      return update
    } catch (error) {
      throw error
    }
  }

  /**
   * 根据id删除
   * @param id 资源 id （数值）
   */
  async removeOneById(id: number): Promise<boolean> {
    const resource = new ResourceEntity(); // 实例化资源 resource
    resource.id = id;
    const removeOneById = await this.resourceRepository.remove(resource);
    if (!removeOneById) {
      throw new HttpException({ message: '删除失败' }, HttpStatus.FORBIDDEN);
    }
    return true;
  }
}
