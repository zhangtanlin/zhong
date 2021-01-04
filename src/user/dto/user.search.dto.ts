/**
 * 导入
 */
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
 * @param {number} [1] 已激活
 * @param {number} [2] 未激活
 */
export enum userStatus {
  yes = 1,
  no = 2,
}

/**
 * 查询用户dto验证
 * @param {number} [id]          - 用户id【可以为数字且最小值为1，或者不填】
 * @param {string} [name]        - 用户名【最长长度为255，或者不填】
 * @param {string} [currentPage] - 当前页码【最小为1】
 * @param {string} [pageSize]    - 显示条数【最小为1】
 */
export class UserSearchDto {
  @IsOptional()
  @Type(() => Number)
  @IsNotEmpty({ message: 'id不能为空' })
  id: number

  @IsOptional()
  @Type(() => String)
  @MaxLength(255, { message: '账号长度最长为 $constraint1' })
  account: string

  @IsOptional()
  @Type(() => String)
  @MaxLength(255, { message: '账号长度最长为 $constraint1' })
  name: string

  @IsOptional()
  @Type(() => Number)
  @Min(0, { message: '区域代码最小为 $constraint1' })
  @Max(999999, { message: '区域代码最大为 $constraint1' })
  area_id: string

  @IsOptional()
  @Type(() => String)
  @IsNotEmpty({ message: '邮箱不能为空' })
  email: string

  @IsOptional()
  @Type(() => Number)
  @Min(0, { message: '年龄最小为 $constraint1' })
  @Max(200, { message: '年龄最大为 $constraint1' })
  age: number

  @IsOptional()
  @Type(() => Number)
  @IsEnum(userStatus)
  status: number

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: '页码需要为数字' })
  @Min(1, { message: '页码最小为 $constraint1' })
  currentPage: number = 1

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: '显示条数需要为数字' })
  @Min(1, { message: '显示条数最小为 $constraint1' })
  pageSize: number = 10

}
