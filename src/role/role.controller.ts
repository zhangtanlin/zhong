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
  UseGuards
 } from '@nestjs/common';
import { RoleService } from './role.service';
import { AuthGuard } from '../common/guard/auth.guard';
import { RoleAddDto } from './dto/role.add.dto';
import { DtoPipe } from '../common/pipe/dto.pipe';

@Controller('role')
export class RoleController {
  /**
   * @function [constructor] - 类中定义的构造函数
   * @param    [private]     - 修饰的属性或方法是私有的，不能在声明它的类的外部访问
   * @param    [readonly]    - 表示属性或方法只能使用不能修改
   */
  constructor(
    private readonly roleService: RoleService
  ) {}

  /**
   * 获取所有列表
   * @param [request]  - 请求参数【可以为空】
   * @param [HttpCode] - 状态码
   */
  @Get("get")
  @HttpCode(200)
  async get(@Param() request: any): Promise<object> {
    try {
      const data = await this.roleService.find();
      if (!data) {
        throw new HttpException({ error: "获取列表失败" }, 502);
      }
      return {
        code: 200,
        message: "成功",
        data
      };
    } catch (error) {
      throw error;
    }
  }
  /**
   * 新增
   * @param [request]  - 请求参数
   * @param [HttpCode] - 状态码
   */
  @Post("add")
  @UsePipes(DtoPipe)
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async add(@Body() request: RoleAddDto): Promise<object> {
    try {
      const data = await this.roleService.save(request);
      if (!data) {
        throw new HttpException({ error: "获取列表失败" }, 502);
      }
      return {
        code: 200,
        message: "成功",
        data
      };
    } catch (error) {
      throw error;
    }
  }
  /**
   * 编辑
   * @param [] - 
   */
  async edit(@Body() request: RoleAddDto): Promise<object> {
    try {
      return {
        code: 200,
        message: "成功",
      }
    } catch (error) {
      throw error;
    }
  }
}
