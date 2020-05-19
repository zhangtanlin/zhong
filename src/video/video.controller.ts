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
import { ResultDto } from '../common/dto/result.dto'
import { VideoGetDto } from './dto/video.get.dto'
import { VideoAddDto } from './dto/video.add.dto'


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
  async get(@Query() querys: VideoGetDto): Promise<ResultDto> {
    let data = null
    try {
      data = await this.videoService.getManyAndCount(querys)
      if (!data) {
        throw new HttpException({ error: '获取列表失败' }, 502)
      }
    } catch (error) {
      data = []
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
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async add(@Body() request: VideoAddDto): Promise<ResultDto> {
    let data = null
    try {
      data = await this.videoService.save(request)
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
  async edit(@Body() request: VideoAddDto): Promise<ResultDto> {
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
