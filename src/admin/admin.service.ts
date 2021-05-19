import {
  Injectable,
  HttpException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AdminEntity } from './admin.entity'
import { AdminInsertDto } from './dto/admin.insert.dto'
import { RedisService } from 'nestjs-redis'
import { AdminLoginDto } from './dto/admin.login.dto'
import * as CryptoJS from 'crypto-js'
import { passwordKey } from '../common/config'
import { AdminSearchDto } from './dto/admin.search.dto'
import { RoleService } from '../role/role.service'
import { AdminUpdateDto } from './dto/admin.update.dto'
import { IdDto } from '../common/dto/id.dto'

// 管理员
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    private readonly roleService: RoleService,
    private readonly redisService: RedisService
  ) { }

  // 查询所有【根据query条件】
  find(querys: AdminSearchDto): Promise<AdminEntity[]> {
    return this.adminRepository.find(querys)
  }

  // 根据id查询
  async findOneById(id: number): Promise<AdminEntity> {
    try {
      const findAdminById: AdminEntity = await this.adminRepository.findOne(id);
      if (!findAdminById) {
        throw new HttpException('当前id不存在数据库中', 502);
      }
      return findAdminById;
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
}

  /**
   * 分页模糊查询
   * @param {object} [data] - 含有列表和总条数的对象返回值
   * @function [list] - typeorm的模糊查询+统计
   * @deprecated 模糊查询对象需要是字符串
   */
  async getManyAndCount(query: AdminSearchDto): Promise<any> {
    let data = {
      list: [],
      total: 0
    }
    try {
      const list = await this.adminRepository.createQueryBuilder('admin')
        .where('admin.account like :account')
        .andWhere('admin.name like :name')
        .andWhere('admin.phone like :phone')
        .andWhere('admin.area like :area')
        .andWhere('admin.email like :email')
        .andWhere('admin.status like :status')
        .setParameters({
          account: `%${query.account ? query.account : ''}%`, // 账号
          name: `%${query.name ? query.name : ''}%`,          // 用户名
          phone: `%${query.phone ? query.phone : ''}%`,       // 电话
          area: `%${query.area ? query.area : ''}%`, // 区域代码
          email: `%${query.email ? query.email : ''}%`,       // 邮箱
          status: `%${query.status ? query.status : ''}%`,    // 状态
        })
        .skip((query.page - 1) * query.pageSize)
        .take(query.pageSize)
        .getManyAndCount()
      data.list = list[0]
      data.total = list[1]
    } catch (error) {
      throw new HttpException('获取列表失败', 502)
    } finally {
      return data
    }
  }

  // 新增
  async save(data: AdminInsertDto): Promise<AdminEntity> {
    try {
      // 验证是否存在
      const findOneByAccount = await this.adminRepository.findOne({
        account: data.account
      })
      if (findOneByAccount) {
        throw new HttpException('账号已存在', 400)
      }
      // 密码加密
      data.password = CryptoJS.HmacSHA512(data.password, passwordKey).toString()
      // 保存信息
      const save: AdminEntity = await this.adminRepository.save(data)
      if (!save) {
        throw new HttpException('入库失败', 502)
      }
      return save
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  // 更新
  async updateById(data: AdminUpdateDto): Promise<boolean> {
    try {
      // 验证id是否存在
      const findOneById: AdminEntity = await this.adminRepository.findOne({
        id: data.id
      })
      if (!findOneById) {
        throw new HttpException({ error: 'ID不存在' }, 400)
      }
      // 如果密码存在则对密码进行加密
      if (data.password) {
        data.password = CryptoJS.HmacSHA512(data.password, passwordKey).toString()
      }
      // 更新信息
      const update = await this.adminRepository.update({ id: data.id }, data)
      if (!update) {
        throw new HttpException({ error: '更新用户失败' }, 502)
      }
      return true
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  // 删除
  async deleteById(data: IdDto): Promise<boolean> {
    try {
      const deleteById = await this.adminRepository.delete(data)
      if (!deleteById) {
        throw new HttpException({ error: '删除用户失败' }, 502)
      }
      return true
    } catch (error) {
      throw error
    }
  }

  /**
   * 管理系统登陆
   * @class [AdminLoginDto] - 验证登陆参数的dto【用户名和密码】
   * @callback 返回token字符串
   */
  async login(data: AdminLoginDto): Promise<any> {
    // 验证 account 是否存在
    const findOneByAccount = await this.adminRepository.findOne({
      account: data.account
    })
    if (!findOneByAccount) {
      throw new HttpException({ error: '账号不存在' }, 403)
    }
    // 验证名称和密码是否匹配
    const findOneAdmin = await this.adminRepository.findOne({
      account: data.account,
      password: CryptoJS.HmacSHA512(data.password, passwordKey).toString() // 密码加密
    })
    if (!findOneAdmin) {
      throw new HttpException({ error: '密码错误' }, 403)
    }
    /**
     * 根据角色id数组查询资源
     * @param {array}  [roleIdArray]       - 角色ID数组
     * @param {array}  [roleArray]         - 角色数组
     * @param {string} [resourceIdsString] - 以逗号分隔的资源id字符串
     * @param {array}  [temporaryArray]    - 【局部变量】资源id数组【使用[...new set()]把数组去重】
     */
    const roleIdArray = findOneAdmin.roles.split(",")
    const roleArray = await this.roleService.findByIds(roleIdArray)
    let resourceIdsString = ''
    if (Array.isArray(roleArray) && roleArray.length) {
      let temporaryArray = []
      for (const iterator of roleArray) {
        temporaryArray.push(iterator.resources.split(","))
      }
      temporaryArray = [...new Set(temporaryArray)]
      resourceIdsString = String(temporaryArray)
    }
    /**
     * 生成token
     * @param {string} [token] - 加密token【含账号/id/角色/资源】
     * @require [client] - redis服务
     * @function [addRedis] - 把token保存到redis【redis保存的key值为=>'账号:token'}】
     */
    const token = CryptoJS.AES.encrypt(
      JSON.stringify({
        account: findOneAdmin.account,
        id: findOneAdmin.id,
        roles: findOneAdmin.roles,
        resources: resourceIdsString
      }),
      passwordKey
    ).toString()
    const client = await this.redisService.getClient()
    const setexRedis = await client.setex(
      findOneAdmin.account + ':token',
      600000,
      token
    )
    if (!setexRedis) {
      throw new HttpException({ error: 'token存储redis失败' }, 500)
    }
    return { token }
  }

  /**
   * 管理系统登出
   * @param {string} [account] - 名称
   * @function [client]     - 创建redis的连接
   * @function [client.del] - redis的删除字符串方法
   */
  async logout(account: string): Promise<any> {
    let data: Boolean = null
    try {
      const client = await this.redisService.getClient()
      await client.del(account + ':token')
      data = true
    } catch (error) {
      data = false
      throw new HttpException({ error: '删除redis失败' }, 500)
    } finally {
      return data
    }
  }
}
