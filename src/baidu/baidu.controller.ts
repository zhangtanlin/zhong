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
import { classToPlain } from 'class-transformer'
import { DtoPipe } from '../common/pipe/dto.pipe'
import { AuthAdminGuard } from '../common/guard/auth_admin.guard'
import { ResultDto } from '../common/dto/result.dto'
import { BaiduService } from './baidu.service'
import { BaiduEntity } from './baidu.entity'
import { BaiduGetDto } from './dto/baidu.get.dto'
import { BaiduAddDto } from './dto/baidu.add.dto'
@Controller('/sys/baidu')
export class BaiduController {
  /**
   * @function [constructor] - 类中定义的构造函数
   * @param    [private]     - 修饰的属性或方法是私有的，不能在声明它的类的外部访问
   * @param    [readonly]    - 表示属性或方法只能使用不能修改
   */
  constructor(
    @Inject(forwardRef(() => BaiduService))
    private readonly baiduService: BaiduService
  ) { }

  /**
   * 查询列表【有分页条件就分页查询，没有分页查询就查询所有】
   * @param [request]  - 请求参数【可以为空】
   * @param [HttpCode] - 状态码
   */
  @Post('/list')
  @UsePipes(DtoPipe)
  @HttpCode(200)
  async get(@Query() querys: BaiduGetDto): Promise<ResultDto> {
    let data = null
    try {
      const list: BaiduEntity[] = await this.baiduService.getManyAndCount(querys);
      if (!list) {
        throw new HttpException({ message: '获取列表失败' }, 500)
      }
      data = classToPlain(list);
    } catch (error) {
      throw new HttpException(
        error.response,
        error.status,
      )
    } finally {
      return {
        code: 200,
        message: '成功',
        data
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
  @UseGuards(AuthAdminGuard)
  @HttpCode(200)
  async add(@Body() request: BaiduAddDto): Promise<ResultDto> {
    let data = null
    try {
      data = await this.baiduService.save(request)
      if (!data) {
        throw new HttpException({ message: '获取列表失败' }, 502)
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
   * @param {BaiduAddDto} [request] 百度查询dto
   */
  async edit(@Body() request: BaiduAddDto): Promise<ResultDto> {
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
