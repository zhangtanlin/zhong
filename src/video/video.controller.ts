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
  Query
} from '@nestjs/common'
import { VideoService } from './video.service'
import { AuthGuard } from '../common/guard/auth.guard'
import { DtoPipe } from '../common/pipe/dto.pipe'
import { VideoGetDto } from './dto/video.get.dto'
import { VideoAddDto } from './dto/video.add.dto'
import { listenerCount } from 'events'


@Controller('/api/video')
export class VideoController {
  /**
   * @function [constructor] - 类中定义的构造函数
   * @param    [private]     - 修饰的属性或方法是私有的，不能在声明它的类的外部访问
   * @param    [readonly]    - 表示属性或方法只能使用不能修改
   */
  constructor(
    private readonly videoService: VideoService
  ) {}

  /**
   * 查询列表【有分页条件就分页查询，没有分页查询就查询所有】
   * @param [request]  - 请求参数【可以为空】
   * @param [HttpCode] - 状态码
   */
  @Get()
  @UsePipes(DtoPipe)
  @HttpCode(200)
  async get(@Query() querys: VideoGetDto): Promise<any> {
    let data = null
    try {
      const list = await this.videoService.getManyAndCount(querys)
      if (!list) {
        throw new HttpException('获取列表失败', 500)
      }
      return list
    } catch (error) {
      throw new HttpException(
        error.response,
        error.status,
      )
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
  async add(@Body() request: VideoAddDto): Promise<any> {
    try {
      const data = await this.videoService.save(request)
      if (!data) {
        throw new HttpException('获取列表失败', 500)
      }
      return data
    } catch (error) {
      throw new HttpException(
        error.response,
        error.status,
      )
    }
  }
  /**
   * 编辑
   * @param [] -
   */
  async edit(@Body() request: VideoAddDto): Promise<any> {
    try {
      const data = '编辑成功'
      return data
    } catch (error) {
      throw new HttpException(
        error.response,
        error.status,
      )
    }
  }
}
