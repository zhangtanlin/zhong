import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entity/role.entity';
import { Repository, getConnection } from 'typeorm';

@Injectable()
export class RoleService {
  /**
   * 函数
   */
  constructor (
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>
  ) {}
  /**
   * 查询所有用户
   */
  async find(): Promise<RoleEntity[]> {
    const find = await this.roleRepository.find();
    return find;
  }
  /**
   * 保存
   */
  async save(data): Promise<any> {
    const save = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(RoleEntity)
    .values(data)
    .execute();
    return save;
  }
}
