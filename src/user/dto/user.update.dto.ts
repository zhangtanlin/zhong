/**
 * 导入
 */
import { Type } from 'class-transformer'
import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsPositive,
  IsMobilePhone,
  IsPhoneNumber,
  IsEmail,
  IsNumberString,
  IsEnum,
  IsIn,
  IsDate,
  IsISBN,
  IsIP,
  IsInt,
  IsDateString,
  IsString
} from 'class-validator'

// 更新用户dto验证
export class UserUpdateDto {
  // ID（必填）
  @IsNotEmpty({ message: 'id不能为空' })
  id: number

  // 账号
  @IsOptional()
  @IsNotEmpty({ message: '账号不能为空' })
  @MaxLength(255, { message: '账号长度最长为 $constraint1' })
  account: string

  // 用户名
  @IsOptional()
  @MaxLength(255, { message: '用户名长度最长为 $constraint1' })
  name: string

  // 密码
  @IsOptional()
  @MinLength(3, { message: '密码长度最少为 $constraint1 ,但实际为 $value' })
  @MaxLength(255, { message: '密码长度最长为 $constraint1' })
  password: string

  // 头像
  @IsOptional()
  @MaxLength(255, { message: '头像地址长度最长为 $constraint1' })
  avatar: string

  // 手机号码
  @IsOptional()
  @IsString()
  phone: string

  // 邮箱
  @IsOptional()
  @IsString()
  email: string

  // 年龄
  @IsOptional()
  @Type(() => Number)
  @IsPositive({ message: '年龄需要为正整数' })
  age: number

  // 区域id
  @IsOptional()
  @IsNumberString()
  area_id: string

  // 角色id
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: '角色id长度最长为 $constraint1' })
  roles: string

  // 账号状态
  @IsOptional()
  @IsEnum(['1', '2'])
  status: string

  // 激活时间
  @IsOptional()
  @IsDateString({ message: '激活时间应为日期类型字符串' })
  activate_time: Date

  // 是否锁定
  @IsOptional()
  @IsEnum(['1', '2'])
  is_locked: string

  // 锁定时间
  @IsOptional()
  @IsDateString({ message: '锁定时间应为日期类型字符串' })
  locked_time: Date

  // 是否禁用
  @IsOptional()
  @IsEnum(['1', '2'])
  is_disabled: string

  // 禁用时间
  @IsOptional()
  @IsDateString({ message: '禁用时间应为日期类型字符串' })
  disabled_time: Date

  // 最后一次登录的ip
  @IsOptional()
  @IsString()
  last_login_ip: string

  // 最后一次登录的时间
  @IsOptional()
  @IsDateString({ message: '最后一次登录的时间应为日期类型字符串' })
  last_login_time: Date

  // 创建时间
  @IsOptional()
  @IsDateString({ message: '创建时间应为日期类型字符串' })
  create_time: Date

  // 部门
  @IsOptional()
  @MaxLength(255, { message: '部门长度最长为 $constraint1' })
  department: string

  // 公司
  @IsOptional()
  @MaxLength(255, { message: '公司长度最长为 $constraint1' })
  firm: string
}
