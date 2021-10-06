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
  @Type(() => String)
  @IsNotEmpty({ message: '账号不能为空' })
  @MaxLength(255, { message: '账号长度最长为 $constraint1' })
  account: string

  // 用户名
  @IsOptional()
  @Type(() => String)
  @MaxLength(255, { message: '用户名长度最长为 $constraint1' })
  name: string

  // 密码
  @IsOptional()
  @Type(() => String)
  @MinLength(3, { message: '密码长度最少为 $constraint1 ,但实际为 $value' })
  @MaxLength(255, { message: '密码长度最长为 $constraint1' })
  password: string

  // 头像
  @IsOptional()
  @Type(() => String)
  @MaxLength(255, { message: '头像地址长度最长为 $constraint1' })
  avatar: string

  // 手机号码
  @IsOptional()
  @Type(() => String)
  @IsString()
  phone: string

  // 邮箱
  @IsOptional()
  @Type(() => String)
  @IsString()
  email: string

  // 年龄
  @IsOptional()
  @Type(() => Number)
  @IsPositive({ message: '年龄需要为正整数' })
  age: number

  // 区域id
  @IsOptional()
  @Type(() => String)
  @IsNumberString()
  area: string

  // 角色id
  @IsOptional()
  @Type(() => String)
  @IsString()
  @MaxLength(255, { message: '角色id长度最长为 $constraint1' })
  roles: string

  // 账号状态(是否激活{1:"已激活", 2:"未激活"})
  @IsOptional()
  @Type(() => String)
  @IsEnum(['1', '2'])
  status: string

  // 激活时间
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: '激活时间应为日期类型' })
  activate_time: Date
   
  // 是否锁定
  @IsOptional()
  @Type(() => String)
  @IsEnum(['1', '2'])
  is_locked: string

  // 锁定时间
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: '锁定时间应为日期类型' })
  locked_time: Date

  // 是否禁用
  @IsOptional()
  @Type(() => String)
  @IsEnum(['1', '2'])
  is_disabled: string

  // 禁用时间
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: '禁用时间应为日期类型' })
  disabled_time: Date

  // 最后一次登录的ip
  @IsOptional()
  @Type(() => String)
  @IsString()
  last_login_ip: string

  // 最后一次登录的时间
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: '最后一次登录的时间应为日期类型' })
  last_login_time: Date

  // 创建时间
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: '创建时间应为日期类型' })
  create_time: Date

  // 部门
  @IsOptional()
  @Type(() => String)
  @MaxLength(255, { message: '部门长度最长为 $constraint1' })
  department: string

  // 公司
  @IsOptional()
  @Type(() => String)
  @MaxLength(255, { message: '公司长度最长为 $constraint1' })
  firm: string
}
 