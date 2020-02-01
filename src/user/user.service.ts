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
 * @requires [UserAddDto]        - 用以验证新增参数正确与否的dto方法
 * @requires [RedisService]      - nestjs连接redis的方法
 * @requires [UserLoginDto]      - 用以验证登陆参数正确与否的dto方法
 * @requires [CryptoJS]          - 加密解密方法
 * @requires [PasswordKey]       - 签名的key值
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
  HttpStatus,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { UserAddDto } from "./dto/user.add.dto";
import { RedisService } from "nestjs-redis";
import { UserLoginDto } from "./dto/user.login.dto";
import * as CryptoJS from 'crypto-js'
import PasswordKey from '../common/key/passwordKey'
import { UserGetDto } from "./dto/user.get.dto";

@Injectable()
export class UserService {
  /**
   * 函数
   */
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
    private readonly redisService: RedisService
  ) {}

  /**
   * 查询用户【根据params条件】
   */
  find(querys: UserGetDto): Promise<UserEntity[]> {
    return this.UserRepository.find(querys);
  }

  /**
   * 新增用户
   */
  async save(data: UserAddDto): Promise<UserEntity> {
    try {
      const findOneByAccount = await this.UserRepository.findOne({
        account: data.account
      });
      if (findOneByAccount) {
        throw new HttpException({ error: '账号已存在' }, 400);
      }
      data.password = CryptoJS.HmacSHA512(data.password, PasswordKey).toString(); // 密码加密
      const save: UserEntity = await this.UserRepository.save(data);
      if (!save) {
        throw new HttpException({ error: '账号存储失败' }, 502);
      }
      return save;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 登陆
   * @param    UserLoginDto     - 验证用户登陆参数的dto【用户名和密码】
   * @function client           - 创建redis的连接
   * @function findOneByAccount - 根据账号查询用户
   * @function findOne          - 根据用户名和密码查询用户
   * @function token            - 加密name,id,roles生成的对象
   * @function client           - 连接redis的方法
   * @function addRedis         - 使用redis的setex方法把数据存储到redis并设置过期时间
   * @callback 返回以token为key的对象
   */
  async login(data: UserLoginDto): Promise<any> {
    try {
      const findOneByAccount = await this.UserRepository.findOne({
        account: data.account,
      });
      if(!findOneByAccount) {
        throw new HttpException({ error: '账号不存在' },403);
      }
      const findOne = await this.UserRepository.findOne({
        account: data.account,
        password: CryptoJS.HmacSHA512(data.password, PasswordKey).toString() // 密码加密
      });
      if(!findOne) {
        throw new HttpException({ error: '密码错误' },403);
      }
      const token = CryptoJS.AES.encrypt(
        JSON.stringify({
          name: findOne.name,
          id: findOne.id,
          roles: findOne.roles
        }),
        PasswordKey
      ).toString();
      const client = await this.redisService.getClient();
      const addRedis = await client.setex(
        findOne.name + ':token',
        60000,
        token
      );
      if(!addRedis) {
        throw new HttpException({ error: '生成token失败' },500);
      }
      return token;
    } catch (error) {
      throw error;
    }
  }
}
