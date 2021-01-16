import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsPositive,
  IsInt,
  Min,
  Max,
  IsEnum
} from 'class-validator'
import { Type } from 'class-transformer'

/**
 * 状态枚举
 * @param {String} '1' 已激活
 * @param {String} '0' 未激活
 */
export enum userStatus {
  yes = '1',
  no = '0',
}

// 查询用户
export class UserSearchDto {
  // 用户id
  @IsOptional()
  @Type(() => Number)
  @IsNotEmpty({ message: 'id不能为空' })
  id: number

  // 账号
  @IsOptional()
  @Type(() => String)
  @MaxLength(255, { message: '账号长度最长为 $constraint1' })
  account: string

  // 用户名
  @IsOptional()
  @Type(() => String)
  @MaxLength(255, { message: '账号长度最长为 $constraint1' })
  name: string

  // 区域id
  @IsOptional()
  @Type(() => Number)
  @Min(0, { message: '区域代码最小为 $constraint1' })
  @Max(999999, { message: '区域代码最大为 $constraint1' })
  area_id: string

  // 邮箱
  @IsOptional()
  @Type(() => String)
  @IsNotEmpty({ message: '邮箱不能为空' })
  email: string

  // 状态{1:"已激活", 2:"未激活"}
  @IsOptional()
  @Type(() => String)
  @IsEnum(userStatus)
  status: string

  // 页码（最小为1）
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: '页码需要为数字' })
  @Min(1, { message: '页码最小为 $constraint1' })
  page: number = 1

  // 每页显示的条数（最小为10）
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: '显示条数需要为数字' })
  @Min(1, { message: '显示条数最小为 $constraint1' })
  pageSize: number = 10

}
