<<<<<<< HEAD
import { Injectable, HttpException, Inject, forwardRef, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ResourceEntity } from './entity/resource.entity'
import { Repository } from 'typeorm'
import { ResourceAddDto } from './dto/resource.add.dto'
import { ResourceObjectDto } from './dto/resource.object.dto'
=======
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourceDto } from './dto/dto';
import { ResourceEntity } from './resource.entity';
>>>>>>> 1f5ae6d353d3cb15a2e6e4d94fcaf3bb131d9a70

@Injectable()
export class ResourceService {

  constructor(
    @InjectRepository(ResourceEntity)
    private readonly resourceRepository: Repository<ResourceEntity>
  ) { }

  /**
   * 新增
   * @class [UserInsertDto]     新增dto
   * @function findOneByAccount 验证账号是否存在
   * @function save             保存用户信息
   */
<<<<<<< HEAD
  async findByArrIds(data: any[]): Promise<ResourceEntity[]> {
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
   * 根据id数值查询数据
   * @param id 资源id
   */
  async findByArrId(id: number): Promise<ResourceEntity> {
    const findResource = await this.resourceRepository
      .createQueryBuilder('resource')
      .where("resource.id = :id", { id })
      .getOne()
    if (!findResource) {
      throw new HttpException({ error: '查询列表失败' }, 502)
    }
    return findResource;
  }

  /**
   * 保存
   */
  async save(data: ResourceAddDto): Promise<ResourceEntity> {
    const findOneByName: ResourceEntity = await this.resourceRepository.findOne({
      name: data.name,
    });
    if (findOneByName) {
      throw new HttpException('资源名重复', HttpStatus.FORBIDDEN);
    }
    const findOneByAlias: ResourceEntity = await this.resourceRepository.findOne({
      alias: data.alias,
    });
    if (findOneByAlias) {
      throw new HttpException('资源别名重复', HttpStatus.FORBIDDEN);
    }
    const findOneByAddress: ResourceEntity = await this.resourceRepository.findOne({
      target: data.target,
    });
    if (findOneByAddress) {
      throw new HttpException('资源地址重复', HttpStatus.FORBIDDEN);
    }
    const resource = new ResourceEntity(); // 初始化User
    resource.name = data.name;
    resource.alias = data.alias;
    resource.target = data.target;
    const save: ResourceEntity = await this.resourceRepository.save(resource);
    if (!save) {
      throw new HttpException('插入数据库失败', HttpStatus.FORBIDDEN);
=======
  async create(): Promise<ResourceDto> {
    try {
      return;
    } catch (error) {
      throw error
>>>>>>> 1f5ae6d353d3cb15a2e6e4d94fcaf3bb131d9a70
    }
    return save;
  }

  /**
   * 根据id数组查询数据
   * @param ids id数组
   */
  async resourcesFindByIds(ids: number[]): Promise<ResourceDto[]> {
    try {
      const resourcesFindByIds: ResourceEntity[] = await this.resourceRepository.findByIds(ids);
      if (resourcesFindByIds) {
        return resourcesFindByIds || [];
      }
    } catch (error) {
      console.log('9999')
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
      throw new HttpException('删除失败', HttpStatus.FORBIDDEN);
    }
    return true;
  }
}
