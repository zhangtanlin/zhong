/**
 * 导入
 * @requires [IsOptional] - 如果字段不存在就不进行验证
 * @requires [IsNumber]   - 是否为数值
 * @requires [IsString]   - 是否为字符串
 */
import {
  IsOptional,
  IsNumber,
  IsString,
  IsInt,
  Min,
  Max,
  IsEnum,
  MaxLength
} from 'class-validator'
import { Type } from 'class-transformer'

/**
 * 【枚举】资源类型
 * @param {number} [menu]   - 菜单
 * @param {number} [button] - 按钮
 */
export enum ResourceType {
  menu = 1,
  button = 2
}
/**
 * 【枚举】是否显示（显示在）
 * @param {number} [menu]   - 菜单
 * @param {number} [button] - 按钮
 */
export enum ResourceIsShow {
  no = 0,
  yes = 1
}

// 根据resource对象进行验证
export class ResourceObjectDto {
  // id
  @IsOptional()
  @Type(() => Number)
  @IsInt({
    message: 'id应为正整数'
  })
  @Min(0, {
    message: 'id最小值为0'
  })
  @Max(99999999999, {
    message: 'id最大值为11位数值'
  })
  id: number

  // pid
  @IsOptional()
  @Type(() => Number)
  @IsInt({
    message: 'pid应为正整数'
  })
  @Min(0, {
    message: 'pid最小值为0'
  })
  @Max(99999999999, {
    message: 'pid最大值为11位数值'
  })
  pid: number

  // 资源名
  @IsOptional()
  @Type(() => String)
  @IsString({
    message: '资源名应为字符串'
  })
  name: string

  // 别名
  @IsOptional()
  @Type(() => String)
  @IsString({
    message: '别名应为字符串'
  })
  alias: string

  // 类型【资源类型{1:"菜单",2:"按钮"}】
  @IsOptional()
  @Type(() => Number)
  // @IsEnum(ResourceType, {
  //   message: '资源类型只能为1或2'
  // })
  type: number

  // 路由地址【路由跳转地址】
  @IsOptional()
  @Type(() => String)
  @IsString({
    message: '路由地址名应为字符串'
  })
  href: string

  // 组件地址【关联的view的组件路径】
  @IsOptional()
  @Type(() => String)
  @IsString({
    message: '组件地址应为字符串'
  })
  target: string

  // 图标
  @IsOptional()
  @Type(() => String)
  @IsString({
    message: '图标应为字符串'
  })
  icon: string

  // 是否在菜单栏显示
  @IsOptional()
  @Type(() => Number)
  // @IsEnum(ResourceIsShow, {
  //   message: '是否显示只能为0或者1'
  // })
  is_show: number

  // 是否在导航栏显示
  @IsOptional()
  @Type(() => Number)
  @IsEnum(ResourceIsShow, {
    message: '是否在导航栏显示只能为0或者1'
  })
  is_navigation: number

  // 权限
  @IsOptional()
  @Type(() => String)
  @MaxLength(255, {
    message: '权限最长为255'
  })
  permission: string

  // 说明
  @IsOptional()
  @Type(() => String)
  @MaxLength(255, {
    message: '说明最长为255'
  })
  description: string
}
