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
import { AdminService } from './admin.service'
import { AdminInsertDto } from './dto/admin.insert.dto'
import { AdminLoginDto } from './dto/admin.login.dto'
import { DtoPipe } from '../common/pipe/dto.pipe'
import { AdminEntity } from './admin.entity'
import { AdminSearchDto } from './dto/admin.search.dto'
import { AES, enc } from 'crypto-js'
import { AdminUpdateDto } from './dto/admin.update.dto'
import { IdDto } from '../common/dto/id.dto'
import { classToPlain } from 'class-transformer'
import { AuthAdminGuard } from '../common/guard/auth_admin.guard'
import { ConfigService } from '@nestjs/config'

// 管理员
@Controller('/sys/admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly configService: ConfigService,
  ) { }

  /**
   * 请求搜索列表
   * @param query 
   * @returns 
   */
  @Get()
  @UsePipes(DtoPipe)
  @UseGuards(AuthAdminGuard)
  @HttpCode(200)
  async get(@Query() query: AdminSearchDto): Promise<any> {
    const searchParam = new AdminSearchDto()
    const param = Object.assign(searchParam, query)
    const list: AdminEntity[] = await this.adminService.getManyAndCount(param)
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
    const findOneById: AdminEntity = await this.adminService.findOneById(params.id);
    return classToPlain(findOneById); // 使用nestjs自带的序列化返回值成功
  }

  // 新增管理员
  @Post('/add')
  @UsePipes(DtoPipe)
  @UseGuards(AuthAdminGuard)
  @HttpCode(200)
  async add(@Body() request: AdminInsertDto): Promise<any> {
    const data: AdminEntity = await this.adminService.save(request)
    return classToPlain(data)
  }

  // 编辑管理员
  @Post('/edit')
  @UsePipes(DtoPipe)
  @UseGuards(AuthAdminGuard)
  @HttpCode(200)
  async edit(@Body() request: AdminUpdateDto): Promise<any> {
    return await this.adminService.updateById(request)
  }

  // 删除管理员
  @Delete('/delete')
  @UsePipes(DtoPipe)
  @UseGuards(AuthAdminGuard)
  @HttpCode(200)
  async delete(@Body() request: IdDto): Promise<any> {
    const data: Boolean = await this.adminService.deleteById(request)
    return data
  }

  // 管理系统登陆
  @Post('login')
  @UsePipes(DtoPipe)
  @HttpCode(200)
  async login(@Body() request: AdminLoginDto): Promise<any> {
    const data: boolean = await this.adminService.login(request)
    return data
  }

  // 管理系统退出
  @Delete('logout')
  @HttpCode(200)
  async logout(@Headers() headersArgument: any): Promise<any> {
    let account = '' // 账号
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
      account = decryptTokenJSON.account
    } catch (error) {
      throw new HttpException({ message: '解密token失败' }, 500)
    }
    return await this.adminService.logout(account)
  }
}