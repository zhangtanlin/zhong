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
  Controller,
  Post,
  HttpCode,
  Body,
  Headers,
  UsePipes,
  UseGuards,
  Delete,
  HttpStatus,
} from '@nestjs/common'
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger'
import { UserService } from './user.service'
import { UserInsertDto } from './dto/user.insert.dto'
import { UserLoginDto } from './dto/user.login.dto'
import { DtoPipe } from '../common/pipe/dto.pipe'
import { ResultDto } from '../common/dto/result.dto'
import { UserEntity } from './user.entity'
import { UserSearchDto } from './dto/user.search.dto'
import * as CryptoJS from 'crypto-js'
import { passwordKey } from '../config'
import { UserUpdateDto } from './dto/user.update.dto'
import { IdDto } from '../common/dto/id.dto'
import { classToPlain } from 'class-transformer'
import { AuthAdminGuard } from 'src/common/guard/auth_admin.guard'

/**
 * 用户控制器
 * @class [ApiTags]    - api文档swagger的大类标记
 * @class [Controller] - nestjs 控制器
 */
@ApiTags('用户')
@Controller('/admin/user')
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
   * @param     [Post]          - 请求方式
   * @param     [UsePipes]      - 管道验证
   * @class     [DtoPipe]       - 自己写的管道验证器【和 UserSearchDto 配合使用】
   * @param     [HttpCode]      - 请求返回状态码
   * @class     [Body]          - nest提供的获取Body参数的方法
   * @faunction [UserSearchDto] - 用以验证Body参数正确与否的dto方法
   * @faunction [classToPlain]  - 类转换成js对象（用于把查询的数据转换成所需要的格式）
   */
  @Post('/list')
  @UsePipes(DtoPipe)
  @UseGuards(AuthAdminGuard)
  @ApiOperation({ summary: '用户列表' })
  @HttpCode(HttpStatus.OK)
  async get(@Body() bodys: UserSearchDto): Promise<any> {
    const searchParam = new UserSearchDto()
    const param = Object.assign(searchParam, bodys)
    const list:UserEntity[] = await this.userService.getManyAndCount(param)
    return classToPlain(list)
  }

  /**
   * 根据id查询用户
   * @param Param 用户id
   * @function classToPlain 表示使用class-transformer内置方法返回数据（eg：可能涉及到排除某个字段，在entity中使用@Exclude()进行排除）
   */
   @Post('/id')
   @HttpCode(HttpStatus.OK)
   async findOne(@Body() bodys): Promise<any> {
     const findOneById: UserEntity = await this.userService.findOneById(bodys.id);
     return classToPlain(findOneById); // 使用nestjs自带的序列化返回值成功
   }
   
  /**
   * 新增用户
   * @param     [Post]           - 请求方式
   * @param     [UsePipes]       - 管道验证
   * @class     [DtoPipe]        - 自己写的管道验证器【和UserInsertDto配合使用】
   * @param     [UseGuards]      - 权限验证
   * @class     [AuthAdminGuard] - 权限验证-管理系统的守卫
   * @param     [HttpCode]       - 请求返回状态码
   * @faunction [add]            - 新增用户的方法
   * @faunction [Body]           - nest提供的获取Body参数的方法
   * @faunction [request]        - Body参数
   * @faunction [UserInsertDto]  - 用以验证Body参数正确与否的dto方法
   * @faunction [classToPlain]   - 类转换成js对象（用于把查询的数据转换成所需要的格式）
   * @return    [ResultDto]      - 返回值对象
   */
  @Post('/add')
  @UsePipes(DtoPipe)
  @UseGuards(AuthAdminGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '新增用户' })
  @ApiResponse({
    status: 200,
    description:
      '状态码200表示请求成功，其他值表示失败，失败原因会写在message里面',
    type: ResultDto
  })
  async add(@Body() bodys: UserInsertDto): Promise<any> {
    const data: UserEntity = await this.userService.save(bodys)
    return classToPlain(data)
  }

  /**
   * 编辑用户
   * @class     [Post]           - 请求方式
   * @class     [UsePipes]       - 管道验证
   * @class     [DtoPipe]        - 自己写的管道验证器【和UserInsertDto配合使用】
   * @class     [UseGuards]      - 权限验证
   * @class     [AuthAdminGuard] - 权限验证-管理系统的守卫
   * @class     [HttpCode]       - 请求返回状态码
   * @faunction [edit()]         - 编辑用户的方法
   * @class     [Body]           - nest提供的获取Body参数的方法
   * @class     [request]        - 客户端Body参数
   * @class     [UserUpdateDto]  - 用以验证Body参数正确与否的dto方法
   * @deprecated 此处不使用trycatch,因为不会处理数据（比如：删除password），使用server模块的错误处理
   */
  @Post('/edit')
  @UsePipes(DtoPipe)
  @UseGuards(AuthAdminGuard)
  @HttpCode(HttpStatus.OK)
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
   * @class     [Delete]         - 请求方式
   * @class     [UsePipes]       - 管道验证
   * @class     [DtoPipe]        - 自己写的管道验证器【和UserInsertDto配合使用】
   * @class     [UseGuards]      - 权限验证
   * @class     [AuthAdminGuard] - 权限验证
   * @class     [HttpCode]       - 请求返回状态码
   * @faunction [delete]         - 新增用户的方法
   * @class     [Body]           - nest提供的获取Body参数的方法
   * @param     [request]        - Body参数
   * @class     [IdDto]          - 用以验证Body参数正确与否的dto方法
   * @returns   [data]           - 返回值
   */
  @Post('/delete')
  @UsePipes(DtoPipe)
  @UseGuards(AuthAdminGuard)
  @HttpCode(HttpStatus.OK)
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
   * @class   [Post]          - 请求方式
   * @class   [UsePipes]      - nest自带的管道【验证客户端参数的合法性】
   * @class   [DtoPipe]       - 自己写的管道验证器【和UserLoginDto配合使用】
   * @class   [UseGuards]     - nest自带的守卫【验证token】
   * @class   [AuthAdminGuard]- 自己写的守卫验证器
   * @class   [HttpCode]      - http状态码
   * @returns [data]          - 返回值
   */
  @Post('login')
  @UsePipes(DtoPipe)
  @UseGuards(AuthAdminGuard)
  @HttpCode(HttpStatus.OK)
  async login(@Body() request: UserLoginDto): Promise<any> {
    const data: boolean = await this.userService.login(request)
    return data
  }

  /**
   * 退出
   * @class    [Delete]        - 请求方式
   * @class    [UseGuards]     - nest自带的守卫【验证token】
   * @class    [AuthAdminGuard]- 自己写的守卫验证器
   * @class    [HttpCode]      - http状态码
   * @function [logout]        - 退出方法
   * @class    [Headers]       - nestjs提供的获取请求头的类
   * @class    [account]       - 内部定义的临时账号名
   * @private  [decryptToken]  - 解密请求头token
   * @private  [tokenJSON]     - toke反序列化
   */
  @Delete('logout')
  @UseGuards(AuthAdminGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Headers() headers: any): Promise<any> {
    let account = ''
    try {
      const decryptToken = CryptoJS.AES.decrypt(headers.authorization, passwordKey).toString(
        CryptoJS.enc.Utf8
      )
      const tokenJSON = JSON.parse(decryptToken)
      account = tokenJSON.account
    } catch (error) {
      throw new HttpException('解密token失败', 500)
    }
    return await this.userService.logout(account)
  }
}
