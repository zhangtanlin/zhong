import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceService } from '../resource/resource.service';
import { Repository } from 'typeorm';
import { RoleEntity } from './role.entity';
import { RoleDto } from './dto/dto';

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly resourceService: ResourceService
  ) { }

  /**
   * 查询所有数据
   * @class [UserInsertDto]     dto
   * @function findOneByAccount 验证账号是否存在
   * @function save             保存用户信息
   */
  async findAll(): Promise<any[]> {
    try {
      const cb = [];
      const find: RoleEntity[] = await this.roleRepository.find();
      if (find.length) {
        for (const iterator of find) {
          let tempResourceFindByIds, tempRoleDto = {};
          if (iterator.resources) {
            const tempResources = iterator.resources.split(',').map(Number);
            tempResourceFindByIds = await this.resourceService.resourcesFindByIds(tempResources);
          }
          tempRoleDto = { ...iterator, resources: tempResourceFindByIds || [] };
          cb.push(tempRoleDto);
        }
      }
      return cb;
    } catch (error) {
      throw error
    }
  }

  /**
   * 根据id数组查询数据
   */
  async findByIds(ids: number[]): Promise<RoleDto[]> {
    try {
      const cb = [];
      const roleFindByIds: RoleEntity[] = await this.roleRepository.findByIds(ids);
      if (roleFindByIds.length) {
        for (const iterator of roleFindByIds) {
          let tempFindByIds, tempDto = {};
          if (iterator.resources) {
            const tempIds = iterator.resources.split(',').map(Number);
            tempFindByIds = await this.resourceService.resourcesFindByIds(tempIds);
          }
          tempDto = { ...iterator, resources: tempFindByIds || [] };
          cb.push(tempDto);
        }
      }
      return cb;
    } catch (error) {
      throw error
    }
  }
}

