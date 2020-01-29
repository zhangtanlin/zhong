import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceEntity } from './entity/resource.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResourceService {
  /**
   * 函数
   */
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly resourceRepository: Repository<ResourceEntity>
  ) {}
  /**
   * 查询所有用户
   */
  async find(): Promise<ResourceEntity[]> {
    const find = await this.resourceRepository.find();
    if(!find){
      throw new HttpException({ error: '查询列表失败' }, 502);
    }
    return find;
  }
}
