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
  IsIP
} from 'class-validator'

// 新增用户dto验证
export class UserInsertDto {
  // 账号
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
  @Type(() => String)
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(3, { message: '密码长度最少为 $constraint1 ,但实际为 $value' })
  @MaxLength(255, { message: '密码长度最长为 $constraint1' })
  password: string

  // 头像
  @IsOptional()
  @Type(() => String)
  @MinLength(1, { message: '头像地址长度最少为 $constraint1 ,但实际为 $value' })
  @MaxLength(255, { message: '头像地址长度最长为 $constraint1' })
  avatar: string

  // 手机号码
  @IsOptional()
  @Type(() => String)
  @IsPhoneNumber('CH', { message: '不是有效的手机号码' })
  phone: string

  // 邮箱
  @IsOptional()
  @Type(() => String)
  @IsEmail()
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
  @MinLength(1, { message: '角色id长度最少为 $constraint1 ,但实际为 $value' })
  @MaxLength(255, { message: '角色id长度最长为 $constraint1' })
  roles: string

  // 账号状态{1:"已激活", 2:"未激活"}
  @IsOptional()
  @Type(() => String)
  @IsEnum(['1', '2'])
  status: string

  // 激活时间
  @IsOptional()
  @IsDate({ message: '激活时间应为日期类型' })
  activate_time: Date

  // 是否第一次登录{1:"是", 2:"否"}
  @IsOptional()
  @Type(() => String)
  @IsEnum(['1', '2'])
  is_first_login: string

  // 是否锁定{1:"是", 2:"否"}
  @IsOptional()
  @Type(() => String)
  @IsEnum(['1', '2'])
  is_locked: string

  // 锁定时间
  @IsOptional()
  @IsDate({ message: '锁定时间应为日期类型' })
  locked_time: Date

  // 是否禁用{1:"是", 2:"否"}
  @IsOptional()
  @Type(() => String)
  @IsEnum(['1', '2'])
  is_disabled: string

  // 禁用时间
  @IsOptional()
  @IsDate({ message: '禁用时间应为日期类型' })
  disabled_time: Date

  // 最后一次登录的ip
  @IsOptional()
  @Type(() => String)
  @IsIP()
  last_login_ip: string

  // 最后一次登录的时间
  @IsOptional()
  @IsDate({ message: '最后一次登录的时间应为日期类型' })
  last_login_time: Date

  // 创建时间
  @IsOptional()
  @IsDate({ message: '创建时间应为日期类型' })
  create_time: Date

  // 部门
  @IsOptional()
  @Type(() => String)
  @MinLength(1, { message: '部门长度最少为 $constraint1 ,但实际为 $value' })
  @MaxLength(255, { message: '部门长度最长为 $constraint1' })
  department: string

  // 公司
  @IsOptional()
  @Type(() => String)
  @MinLength(1, { message: '公司长度最少为 $constraint1 ,但实际为 $value' })
  @MaxLength(255, { message: '公司长度最长为 $constraint1' })
  firm: string
}
