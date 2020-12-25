import { Injectable, HttpException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleEntity } from './entity/role.entity'
import { Repository, getConnection, Like } from 'typeorm'
import { RoleGetDto } from './dto/role.get.dto'

@Injectable()
export class RoleService {
  /**
   * 函数
   */
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>
  ) {}

  /**
   * 分页查询
   */
  async getManyAndCount(params: RoleGetDto): Promise<any> {
    let data = {
      list: [],
      total: 0
    }
    try {
      const list = await this.roleRepository.createQueryBuilder('role')
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
  async findOne(data: object): Promise<RoleEntity> {
    const findOneRole: RoleEntity = await this.roleRepository.findOne(data)
    if (!findOneRole) {
      throw new HttpException({ error: '查询失败' }, 502)
    }
    return findOneRole
  }

  /**
   * 根据id数组查询数据
   * @param [data] - id数组
   */
  async findByIds(data: any[]): Promise<RoleEntity[]> {
    const findRoleArray = await this.roleRepository
      .createQueryBuilder('role')
      .where('role.id IN (:...ids)', { ids: data})
      .getMany()
    if (!findRoleArray) {
      throw new HttpException({ error: '查询列表失败' }, 502)
    }
    return findRoleArray
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
      .execute()
      if (!save) {
        throw new HttpException({ error: '保存角色失败' }, 502)
      }
    return save
  }
}
