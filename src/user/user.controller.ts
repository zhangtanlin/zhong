/**
 * 导入
 * @requires Controller  - nest模块common导出的控制器
 * @requires Post        - nest模块common导出的post请求方式
 * @requires HttpCode    - nest模块common导出的http状态码
 * @requires Body        - nest模块common导出的Body请求参数
 * @requires Headers     - nest模块common导出的Headers请求参数
 * @requires ApiTags     - api文档swagger大类模块
 * @requires ApiResponse - api文档swagger返回值模块
 * @requires UserService - 用户服务模块
 */
import {
  HttpException,
  ForbiddenException,
  Controller,
  Post,
  HttpCode,
  Body,
  Headers,
  UsePipes,
  Get,
  UseGuards,
  Query,
  Delete,
  Param
} from '@nestjs/common'
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger'
import { UserService } from './user.service'
import { UserInsertDto } from './dto/user.insert.dto'
import { AuthGuard } from '../common/guard/auth.guard'
import { UserLoginDto } from './dto/user.login.dto'
import { DtoPipe } from '../common/pipe/dto.pipe'
import { ResultDto } from '../common/dto/result.dto'
import { UserEntity } from './user.entity'
import { UserSearchDto } from './dto/user.search.dto'
import * as CryptoJS from 'crypto-js'
import { passwordKey } from '../common/config'
import { UserUpdateDto } from './dto/user.update.dto'
import { IdDto } from '../common/dto/id.dto'
import { classToPlain } from 'class-transformer'

/**
 * 用户控制器
 * @param [ApiTags] - api文档swagger的大类标记
 */
@ApiTags('用户')
@Controller('/api/user')
export class UserController {
  /**
   * @function [constructor] - 类中定义的构造函数
   * @param    [private]     - 修饰的属性或方法是私有的，不能在声明它的类的外部访问
   * @param    [readonly]    - 表示属性或方法只能使用不能修改
   * @param    [userService] - 用户服务别名
   * @class    [UserService] - 用户服务
   */
  constructor(private readonly userService: UserService) { }
  /**
   * 获取用户列表
   * @param     [Get]        - 请求方式
   * @param     [UsePipes]   - 管道验证
   * @class     [DtoPipe]    - 自己写的管道验证器【和UserGetDto配合使用】
   * @param     [HttpCode]   - 请求返回状态码
   * @faunction [Body]       - nest提供的获取Body参数的方法
   * @faunction [Query]      - query参数
   * @faunction [UserGetDto] - 用以验证Body参数正确与否的dto方法
   */
  @Get()
  @UsePipes(DtoPipe)
  @HttpCode(200)
  async get(@Query() query: UserSearchDto): Promise<any> {
    const searchParam = new UserSearchDto()
    const param = Object.assign(searchParam, query)
    const list:UserEntity[] = await this.userService.getManyAndCount(param)
    return classToPlain(list)
  }

  /**
   * 根据id查询用户
   * @param Param 用户id
   * @function classToPlain 表示使用class-transformer内置方法返回数据（eg：可能涉及到排除某个字段，在entity中使用@Exclude()进行排除）
   */
  @Get(':id')
  @HttpCode(200)
  async findOne(@Param() params): Promise<any> {
    const findOneById: UserEntity = await this.userService.findOneById(params.id);
    return classToPlain(findOneById); // 使用nestjs自带的序列化返回值成功
  }

  /**
   * 新增用户
   * @param     [Post]          - 请求方式
   * @param     [UsePipes]      - 管道验证
   * @class     [DtoPipe]       - 自己写的管道验证器【和UserInsertDto配合使用】
   * @param     [UseGuards]     - 权限验证
   * @param     [HttpCode]      - 请求返回状态码
   * @faunction [add]           - 新增用户的方法
   * @faunction [Body]          - nest提供的获取Body参数的方法
   * @faunction [request]       - Body参数
   * @faunction [UserInsertDto] - 用以验证Body参数正确与否的dto方法
   * @return    [ResultDto]     - 返回值是一个含有提示信息的对象
   */
  @Post('/add')
  @UsePipes(DtoPipe)
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: '新增用户' })
  @ApiResponse({
    status: 200,
    description:
      '状态码200表示请求成功，其他值表示失败，失败原因会写在message里面',
    type: ResultDto
  })
  async add(@Body() request: UserInsertDto): Promise<any> {
    const data: UserEntity = await this.userService.save(request)
    return classToPlain(data)
  }

  /**
   * 编辑用户
   * @param     [Post]          - 请求方式
   * @param     [UsePipes]      - 管道验证
   * @class     [DtoPipe]       - 自己写的管道验证器【和UserInsertDto配合使用】
   * @param     [UseGuards]     - 权限验证
   * @param     [HttpCode]      - 请求返回状态码
   * @faunction [add]           - 新增用户的方法
   * @faunction [Body]          - nest提供的获取Body参数的方法
   * @faunction [request]       - Body参数
   * @faunction [UserUpdateDto] - 用以验证Body参数正确与否的dto方法
   * @deprecated 此处不使用trycatch,因为不会处理数据（比如：删除password），使用server模块的错误处理
   */
  @Post('/edit')
  @UsePipes(DtoPipe)
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: '编辑用户' })
  @ApiResponse({
    status: 200,
    description:
      '状态码200表示请求成功，其他值表示失败，失败原因会写在message里面',
    type: ResultDto
  })
  async edit(@Body() request: UserUpdateDto): Promise<any> {
    return await this.userService.updateById(request)
  }

  /**
   * 删除用户
   * @param     [Delete]    - 请求方式
   * @param     [UsePipes]  - 管道验证
   * @class     [DtoPipe]   - 自己写的管道验证器【和UserInsertDto配合使用】
   * @param     [UseGuards] - 权限验证
   * @param     [HttpCode]  - 请求返回状态码
   * @faunction [delete]    - 新增用户的方法
   * @faunction [Body]      - nest提供的获取Body参数的方法
   * @faunction [request]   - Body参数
   * @faunction [IdDto]     - 用以验证Body参数正确与否的dto方法
   * @return    [ResultDto] - 返回值是一个含有提示信息的对象
   */
  @Delete('/delete')
  @UsePipes(DtoPipe)
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: '删除用户' })
  @ApiResponse({
    status: 200,
    description:
      '状态码200表示请求成功，其他值表示失败，失败原因会写在message里面',
    type: ResultDto
  })
  async delete(@Body() request: IdDto): Promise<any> {
    const data: Boolean = await this.userService.deleteById(request)
    return data
  }

  /**
   * 登陆
   * @requires [UsePipes]    - nest自带的管道【验证客户端参数的合法性】
   * @class    [DtoPipe]     - 自己写的管道验证器【和UserLoginDto配合使用】
   * @requires [UseGuards]   - nest自带的守卫【验证token】
   * @class    [AuthGuard]   - 自己写的守卫验证器
   * @requires [HttpCode]    - http状态码
   * @callback [ResultDto]   - 返回的dto验证
   */
  @Post('login')
  @UsePipes(DtoPipe)
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async login(@Body() request: UserLoginDto): Promise<any> {
    const data: boolean = await this.userService.login(request)
    return data
  }

  /**
   * 退出
   * @requires [UsePipes]    - nest自带的管道【验证客户端参数的合法性】
   * @requires [UseGuards]   - nest自带的守卫【验证token】
   * @class    [AuthGuard]   - 自己写的守卫验证器
   * @requires [HttpCode]    - http状态码
   * @callback [ResultDto]   - 返回的dto验证
   */
  @Delete('logout')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async logout(@Headers() headersArgument: any): Promise<any> {
    let account = '' // 账号
    try {
      /**
       * 根据token内的用户id查询用户
       * @param [decryptToken]     - 解密请求头的authorization参数
       * @param [decryptTokenJSON] - 把解密后的字符串转换成json格式
       */
      const decryptToken = CryptoJS.AES.decrypt(headersArgument.authorization, passwordKey).toString(
        CryptoJS.enc.Utf8
      )
      const decryptTokenJSON = JSON.parse(decryptToken)
      account = decryptTokenJSON.account
    } catch (error) {
      throw new HttpException('解密token失败', 500)
    }
    return await this.userService.logout(account)
  }
}
