/**
 * 导入
 * @requires [common]  - nestjs的公共模块
 * @requires [swagger] - nestjs的公共模块
 */
import {
  HttpException,
  ForbiddenException,
  Controller,
  Post,
  HttpCode,
  Body,
  UsePipes,
  Get,
  Param,
  UseGuards,
  Inject,
  forwardRef,
  Query,
  Logger
} from '@nestjs/common'
import { RoleService } from './role.service'
import { AuthGuard } from '../common/guard/auth.guard'
import { RoleAddDto } from './dto/role.add.dto'
import { DtoPipe } from '../common/pipe/dto.pipe'
import { ResultDto } from '../common/dto/result.dto'
import { RoleGetDto } from './dto/role.get.dto'
import * as CryptoJS from 'crypto-js'
import { passwordKey } from '../common/config'
@Controller('/api/role')
export class RoleController {
  /**
   * @function [constructor] - 类中定义的构造函数
   * @param    [private]     - 修饰的属性或方法是私有的，不能在声明它的类的外部访问
   * @param    [readonly]    - 表示属性或方法只能使用不能修改
   */
  constructor(
    @Inject(forwardRef(() => RoleService))
    private readonly roleService: RoleService
  ) { }

  /**
   * 查询列表【有分页条件就分页查询，没有分页查询就查询所有】
   * @param [request]  - 请求参数【可以为空】
   * @param [HttpCode] - 状态码
   */
  @Get()
  @UsePipes(DtoPipe)
  @HttpCode(200)
  async get(@Query() querys: RoleGetDto): Promise<ResultDto> {
    let cb = null
    try {
      const roleList = await this.roleService.getManyAndCount(querys)
      if (!roleList) {
        throw new HttpException({ error: '获取列表失败' }, 502)
      }
      cb = CryptoJS.AES.encrypt(JSON.stringify(roleList), passwordKey).toString(); // 加密返回值
      new Logger("success");
    } catch (error) {
      cb = null
    } finally {
      return {
        code: 200,
        message: '成功',
        data: cb
      }
    }
  }
  /**
   * 新增
   * @param [request]  - 请求参数
   * @param [HttpCode] - 状态码
   */
  @Post('add')
  @UsePipes(DtoPipe)
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async add(@Body() request: RoleAddDto): Promise<ResultDto> {
    let data = null
    try {
      data = await this.roleService.save(request)
      if (!data) {
        throw new HttpException({ error: '获取列表失败' }, 502)
      }
    } catch (error) {
      data = {}
    } finally {
      return {
        code: 200,
        message: '成功',
        data
      }
    }
  }
  /**
   * 编辑
   * @param [] -
   */
  async edit(@Body() request: RoleAddDto): Promise<ResultDto> {
    let data = null
    try {
      data = '编辑成功'
    } catch (error) {
      data = '编辑失败'
    } finally {
      return {
        code: 200,
        message: '成功',
        data
      }
    }
  }
}
