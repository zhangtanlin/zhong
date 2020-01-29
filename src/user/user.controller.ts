/**
 * 导入
 * @requires [Controller]  - nest模块common导出的控制器
 * @requires [Post]        - nest模块common导出的post请求方式
 * @requires [HttpCode]    - nest模块common导出的http状态码
 * @requires [Body]        - nest模块common导出的Body请求参数
 * @requires [ApiUseTags]  - api文档swagger大类模块
 * @requires [ApiResponse] - api文档swagger返回值模块
 * @requires [UserService] - 用户服务模块
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
  UseGuards,
  Query,
} from "@nestjs/common";
import { 
  ApiUseTags,
  ApiResponse,
  ApiOperation
} from "@nestjs/swagger"
import { UserService } from "./user.service";
import { UserAddDto } from "./dto/user.add.dto";
import { AuthGuard } from "../common/guard/auth.guard";
import { UserLoginDto } from "./dto/user.login.dto";
import { DtoPipe } from "../common/pipe/dto.pipe";
import { UserAddResultDto } from "./dto/user.add.result.dto";
import { UserEntity } from "./entity/user.entity";
import { UserGetDto } from "./dto/user.get.dto";

/**
 * 用户控制器
 * @param [ApiUseTags] - api文档swagger的大类标记
 */
@ApiUseTags('用户')
@Controller("user")
export class UserController {
  /**
   * @function [constructor] - 类中定义的构造函数
   * @param    [private]     - 修饰的属性或方法是私有的，不能在声明它的类的外部访问
   * @param    [readonly]    - 表示属性或方法只能使用不能修改
   */
  constructor(private readonly userService: UserService) {}

  /**
   * 获取用户列表
   * @param     [Get]               - 请求方式
   * @param     [UsePipes]          - 管道验证
   * @param     [HttpCode]          - 请求返回状态码
   * @faunction [add]               - 新增用户的方法
   * @faunction [Body]              - nest提供的获取Body参数的方法
   * @faunction [params]            - Param参数
   * @faunction [UserAddDto]        - 用以验证Body参数正确与否的dto方法
   * @return    {object} [{msg:''}] - 返回值是一个含有提示信息的对象
   */
  @Get("get")
  @UsePipes(DtoPipe)
  @HttpCode(200)
  async get(@Query() querys: UserGetDto): Promise<object> {
    try {
      const data = await this.userService.find(querys);
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
   * 新增用户
   * @param     [Post]              - 请求方式
   * @param     [UsePipes]          - 管道验证
   * @param     [HttpCode]          - 请求返回状态码
   * @faunction [add]               - 新增用户的方法
   * @faunction [Body]              - nest提供的获取Body参数的方法
   * @faunction [request]           - Body参数
   * @faunction [UserAddDto]        - 用以验证Body参数正确与否的dto方法
   * @return    {object} [{msg:''}] - 返回值是一个含有提示信息的对象
   */
  @Post("add")
  @UsePipes(DtoPipe)
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @ApiOperation( { title: '新增用户' } )
  @ApiResponse({ status: 200, description: '状态码200表示请求成功，其他值表示失败，失败原因会写在message里面', type: UserAddResultDto })
  async add(@Body() request: UserAddDto): Promise<UserAddResultDto> {
    try {
      const data: UserEntity = await this.userService.save(request);
      if (!data) {
        throw new HttpException({ error: '新增失败' }, 400);
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
   * 登陆
   * @requires UsePipes  - nest自带的管道【验证客户端参数的合法性】
   * @class    DtoPipe   - 自己写的管道验证器【和UserLoginDto配合使用】
   * @requires UseGuards - nest自带的守卫【验证token】
   * @class    AuthGuard - 自己写的守卫验证器
   * @requires HttpCode  - http状态码
   * @callback {object}  - 返回包含code，message，token组成的对象
   */
  @Post("login")
  @UsePipes(new DtoPipe())
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async login(@Body() request: UserLoginDto): Promise<object> {
    try {
      const token = await this.userService.login(request);
      if(!token){
        throw new ForbiddenException();
      }
      return {
        code: 500,
        message: "成功",
        token
      }
    } catch (error) {
      throw error;
    }
  }
}
