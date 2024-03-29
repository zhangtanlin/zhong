/**
 * 导入
 * BadRequestException           - 400【抛出的异常】
 * UnauthorizedException         - 401【抛出的异常】
 * NotFoundException             - 404【抛出的异常】
 * ForbiddenException            - 403【抛出的异常】
 * NotAcceptableException        - 406【抛出的异常】
 * RequestTimeoutException       - 408【抛出的异常】
 * ConflictException             - 409【抛出的异常】
 * GoneException                 - 410【抛出的异常】
 * PayloadTooLargeException      - 413【抛出的异常】
 * UnsupportedMediaTypeException - 400【抛出的异常】
 * UnprocessableEntityException  - 422【抛出的异常】
 * InternalServerErrorException  - 500【抛出的异常】
 * NotImplementedException       - 501【抛出的异常】
 * BadGatewayException           - 502【抛出的异常】
 * ServiceUnavailableException   - 503【抛出的异常】
 * GatewayTimeoutException       - 504【抛出的异常】
 * @requires [Injectable]        - nest的common模块导出的
 * @requires [HttpException]     - nest的common模块导出的
 * @requires [HttpStatus]        - nest的common模块导出的
 * @requires [InjectRepository]  - nestjs/typeorm导出的
 * @requires [Repository]        - typeorm导出的
 * @requires [UserEntity]        - 数据库用户表结构
 * @requires [UserInsertDto]     - 用以验证新增参数正确与否的dto方法
 * @requires [RedisService]      - nestjs连接redis的方法
 * @requires [UserLoginDto]      - 用以验证登陆参数正确与否的dto方法
 * @requires [CryptoJS]          - 加密解密方法
 * @requires [passwordKey]       - 签名的key值
 */
import {
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
  NotAcceptableException,
  RequestTimeoutException,
  ConflictException,
  GoneException,
  PayloadTooLargeException,
  UnsupportedMediaTypeException,
  UnprocessableEntityException,
  InternalServerErrorException,
  NotImplementedException,
  BadGatewayException,
  ServiceUnavailableException,
  GatewayTimeoutException,
  Injectable,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from './user.entity'
import { UserInsertDto } from './dto/user.insert.dto'
import { UserLoginDto } from './dto/user.login.dto'
import { UserSearchDto } from './dto/user.search.dto'
import { RoleService } from '../role/role.service'
import { UserUpdateDto } from './dto/user.update.dto'
import { IdDto } from '../common/dto/id.dto'
import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { ConfigService } from '@nestjs/config'
import { AES, HmacSHA512 } from 'crypto-js'
import Ioredis from 'ioredis'

@Injectable()
export class UserService {
  // 函数
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly roleService: RoleService,
    private readonly configService: ConfigService,
    @InjectRedis()
    private readonly ioredis: Ioredis,
  ) { }

  // 查询用户【根据query条件】
  find(querys: UserSearchDto): Promise<UserEntity[]> {
    return this.userRepository.find({ where: querys })
  }

  /**
   * 根据id查询
   * @param id 用户id
   * @name findOne 查询一条数据
   */
  async findOneById(id: number): Promise<UserEntity> {
    try {
      const findUserById: UserEntity = await this.userRepository.findOneBy({ id });
      if (!findUserById) {
        throw new HttpException({ message: '当前id不存在数据库中' }, 502);
      }
      return findUserById;
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
  async getManyAndCount(query: UserSearchDto): Promise<any> {
    let data = {
      list: [],
      total: 0
    }
    try {
      const list = await this.userRepository.createQueryBuilder('user')
        .where('user.account like :account')
        .andWhere('user.name like :name')
        .andWhere('user.phone like :phone')
        .andWhere('user.area like :area')
        .andWhere('user.email like :email')
        .andWhere('user.status like :status')
        .setParameters({
          // 账号
          account: `%${query.account ? query.account : ''}%`,
          // 用户名
          name: `%${query.name ? query.name : ''}%`,
          // 电话
          phone: `%${query.phone ? query.phone : ''}%`,
          // 区域代码
          area: `%${query.area ? query.area : ''}%`,
          // 邮箱
          email: `%${query.email ? query.email : ''}%`,
          // 状态
          status: `%${query.status ? query.status : ''}%`,
        })
        .skip((query.page - 1) * query.pageSize)
        .take(query.pageSize)
        .getManyAndCount()
      data.list = list[0]
      data.total = list[1]
    } catch (error) {
      throw new HttpException({ message: '获取列表失败' }, 502)
    } finally {
      return data
    }
  }

  /**
   * 新增用户
   * @class [UserInsertDto] - 新增用户dto
   */
  async save(data: UserInsertDto): Promise<boolean> {
    try {
      // 验证账号是否存在
      const findOneByAccount = await this.userRepository.findOneBy({
        account: data.account
      })
      if (findOneByAccount) {
        throw new ConflictException({ message: '账号已存在' })
      }
      // 密码加密
      data.password = HmacSHA512(
        data.password,
        this.configService.get('TOKEN_KEY'),
      ).toString()
      // 保存用户信息
      const save: UserEntity = await this.userRepository.save(data)
      if (!save) {
        throw new BadGatewayException({ message: '入库失败' })
      }
      return true
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }

  /**
   * 更新用户
   * @class [UserInsertDto] - 更新用户dto
   */
  async updateById(data: UserUpdateDto): Promise<boolean> {
    try {
      // 验证id是否存在
      const findOneById: UserEntity = await this.userRepository.findOneBy({
        id: data.id
      })
      if (!findOneById) {
        throw new HttpException({ message: 'ID不存在' }, 400)
      }
      // 如果密码存在则对密码进行加密
      if (data.password) {
        data.password = HmacSHA512(
          data.password,
          this.configService.get('TOKEN_KEY'),
        ).toString()
      }
      // 更新用户信息
      const update = await this.userRepository.update({ id: data.id }, data)
      if (!update) {
        throw new HttpException({ message: '更新用户失败' }, 502)
      }
      return true
    } catch (error) {
      throw new HttpException({ message: error.response }, error.status)
    }
  }

  /**
   * 删除
   * @class [IdDto] - 删除验证dto
   */
  async deleteById(data: IdDto): Promise<boolean> {
    try {
      // 删除用户信息
      const deleteById = await this.userRepository.delete(data)
      if (!deleteById) {
        throw new HttpException({ message: '删除用户失败' }, 502)
      }
      return true
    } catch (error) {
      throw error
    }
  }

  /**
   * 登陆
   * @class [UserLoginDto] - 验证用户登陆参数的dto【用户名和密码】
   * @callback 返回token字符串
   */
  async login(data: UserLoginDto): Promise<UserLoginType> {
    // 验证account是否存在
    const findOneByAccount = await this.userRepository.findOne({
      where: {
        account: data.account
      }
    })
    if (!findOneByAccount) {
      throw new HttpException({ message: '账号不存在' }, 403)
    }
    // 验证用户名和密码是否匹配
    const findOneUser = await this.userRepository.findOne({
      where: {
        account: data.account,
        password: HmacSHA512(
          data.password,
          this.configService.get('TOKEN_KEY'),
        ).toString() // 密码加密
      }
    })
    if (!findOneUser) {
      throw new HttpException({ message: '密码错误' }, 403)
    }
    /**
     * 根据角色id数组查询资源
     * @param {array}  [roleIdArray]       - 角色ID数组
     * @param {array}  [roleArray]         - 角色数组
     * @param {string} [resourceIdsString] - 以逗号分隔的资源id字符串
     * @param {array}  [temporaryArray]    - 【局部变量】资源id数组【使用[...new set()]把数组去重】
       */
    const roleIdArray = findOneUser.roles.split(",")
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
    const token = AES.encrypt(
      JSON.stringify({
        account: findOneUser.account,
        id: findOneUser.id,
        roles: findOneUser.roles,
        resources: resourceIdsString
      }),
      this.configService.get('TOKEN_KEY'),
    ).toString()
    const setexRedis = await this.ioredis.setex(
      findOneUser.account + ':token',
      600000,
      token
    )
    if (!setexRedis) {
      throw new HttpException({ message: 'token存储redis失败' }, 500)
    }
    return { token }
  }

  /**
   * 登出
   * @param {string} [account] - 账号名
   * @function [client]     - 创建redis的连接
   * @function [client.del] - redis的删除字符串方法
   */
  async logout(account: string): Promise<any> {
    let data: Boolean = null
    try {
      await this.ioredis.del(account + ':token')
      data = true
    } catch (error) {
      data = false
      throw new HttpException({ message: '删除redis失败' }, 500)
    } finally {
      return data
    }
  }
}
