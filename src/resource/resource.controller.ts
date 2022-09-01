/**
 * 导入
 * @require [ResourceService] - 资源服务
 * @require [RedisService]    - redis服务
 */
import {
  Controller,
  Get,
  HttpCode,
  Param,
  Headers,
  HttpException,
  Post,
  UsePipes,
  UseGuards,
  Body,
  Delete,
  Put
} from '@nestjs/common'
import { ResourceService } from './resource.service'
import { DtoPipe } from '../common/pipe/dto.pipe'
import { ResourceAddDto } from './dto/resource.add.dto'
import { ResourceEntity } from './entity/resource.entity'
import { ResourceObjectDto } from './dto/resource.object.dto'
import { idPidToTree } from '../common/utils/tool'
import { AES, enc } from 'crypto-js'
import { AuthAdminGuard } from '../common/guard/auth_admin.guard'
import { ConfigService } from '@nestjs/config'

/**
 * 资源控制器
 */
@Controller('/admin/resource')
export class ResourceController {
  /**
   * 函数
   */
  constructor(
    private readonly resourceService: ResourceService,
    private readonly configService: ConfigService,
  ) { }

  /**
   * 获取列表
   * @param     [Get]               - 请求方式
   * @param     [UsePipes]          - 管道验证
   * @param     [HttpCode]          - 请求返回状态码
   * @faunction [add]               - 新增用户的方法
   * @faunction [Body]              - nest提供的获取Body参数的方法
   * @faunction [request]           - Body参数
   * @faunction [UserAddDto]        - 用以验证Body参数正确与否的dto方法
   * @return    {object} [{msg:''}] - 返回值是一个含有提示信息的对象
   */
  @Get()
  @HttpCode(200)
  async get(@Param() request: object): Promise<any> {
    let data = null
    try {
      data = await this.resourceService.find()
      if (!data) {
        throw new HttpException({ message: '获取列表失败' }, 404)
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
   * 根据id获取一条数据
   */
  @Get(':id')
  async findOneById(@Param() id: number) {
    const resource = new ResourceEntity();
    resource.id = id;
    const data = await this.resourceService.findByArrId(id);
    return { code: 200, message: '查询成功', data };
  }

  /**
   * 新增
   * @param     [Post]              - 请求方式
   * @param     [UsePipes]          - 管道验证
   * @param     [UseGuards]         - 权限验证
   * @param     [HttpCode]          - 请求返回状态码
   * @faunction [add]               - 新增用户的方法
   * @faunction [Body]              - nest提供的获取Body参数的方法
   * @faunction [request]           - Body参数
   * @faunction [UserAddDto]        - 用以验证Body参数正确与否的dto方法
   * @return    {object} [{msg:''}] - 返回值是一个含有提示信息的对象
   */
  @Post('add')
  @UsePipes(DtoPipe)
  @UseGuards(AuthAdminGuard)
  @HttpCode(200)
  async add(@Body() request: ResourceAddDto): Promise<any> {
    const data: ResourceEntity = await this.resourceService.save(request)
    if (!data) {
      throw new HttpException({ message: '新增失败' }, 400)
    }
    return {
      code: 200,
      message: '成功',
      data
    }
  }

  /**
   * 获取菜单列表
   * @param [headersArgument] - 获取请求头参数
   */
  @Post('menu')
  @UsePipes(DtoPipe)
  @UseGuards(AuthAdminGuard)
  @HttpCode(200)
  async menu(
    @Headers() headersArgument: any
  ): Promise<any> {
    let resourceIdArray = [],
      resourceArray = []
    try {
      /**
       * 根据token内的用户id查询用户
       * @param [decryptToken]     - 解密请求头的authorization参数
       * @param [decryptTokenJSON] - 把解密后的字符串转换成json格式
       */
      const decryptToken = AES.decrypt(
        headersArgument.authorization,
        this.configService.get('TOKEN_KEY'),
      ).toString(
        enc.Utf8
      )
      const decryptTokenJSON = JSON.parse(decryptToken)
      /**
       * 根据资源id查询资源
       * @param {array} [resourceIdArray] - token解密后里面的的资源id数组
       * @function [resourceArray] - 资源数组
       * @function [idPidToTree]   - 根据id和pid把资源列表数据组合成树结构的方法
       * @param {array} [cb.data]         - 根据id和pid把资源列表数据组合成树结构
       */
      resourceIdArray = decryptTokenJSON.resources.split(",")
    } catch (error) {
      throw new HttpException({ message: '解密token失败' }, 500)
    }
    try {
      resourceArray = await this.resourceService.findByArrIds(resourceIdArray)
    } catch (error) {
      throw new HttpException(
        { message: error.response },
        error.status
      )
    }
    try {
      const resourceTree = idPidToTree(resourceArray)
      return resourceTree
    } catch (error) {
      throw new HttpException({ message: '资源树生成失败' }, 500)
    }
  }

  /**
   * 更新一条数据
   */
  @UsePipes(DtoPipe)
  @UseGuards(AuthAdminGuard)
  @HttpCode(200)
  @Put(':id')
  async updateOne(@Param() id: number, @Body() bodys: ResourceObjectDto) {
    const data = await this.resourceService.updateOneById(id, bodys);
    return { code: 200, message: '更新资源成功' };
  }

  /**
   * 根据id删除资源
   * @param id 资源id
   */
  @Delete(':id')
  async deleteOne(@Param() param) {
    const data = await this.resourceService.removeOneById(param.id);
    return { code: 200, message: '删除资源成功' };
  }
}
