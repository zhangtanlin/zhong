/**
 * 导入
 */
import { Controller, Get, HttpCode, Param, HttpException } from '@nestjs/common';
import { ResourceService } from './resource.service';

/**
 * 资源控制器
 */
@Controller('resource')
export class ResourceController {
  /**
   * 函数
   */
  constructor(
    private readonly resourceService: ResourceService
  ) {}

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
  @Get("get")
  @HttpCode(200)
  async get(@Param() request:object): Promise<object> {
    try {
      console.log('data')
      const data = await this.resourceService.find();
      console.log('data', data)
      if(!data) {
        throw new HttpException({ error: '获取列表失败' }, 404)
      }
      return {
        code: 200,
        message: "成功",
        data
      }
    } catch (error) {
      console.log(123, error)
      throw error;      
    }
  }
}
