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
  Max
} from 'class-validator'
import { Type } from 'class-transformer'

/**
 * 查询用户dto验证
 * @param {number} [id]          - 用户id【可以为数字且最小值为1，或者不填】
 * @param {string} [name]        - 用户名【最长长度为255，或者不填】
 * @param {string} [currentPage] - 当前页码【最小为1】
 * @param {string} [pageSize]    - 显示条数【最小为1】
 */
export class UserGetDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'id需要为数字' })
  @Min(0, { message: 'id最小为 $constraint1' })
  id: number

  @IsOptional()
  @MaxLength(255, { message: '账号长度最长为 $constraint1' })
  account: string

  @IsOptional()
  @MaxLength(255, { message: '账号长度最长为 $constraint1' })
  name: string

  @IsOptional()
  @Type(() => Number)
  @Min(0, { message: '区域代码最小为 $constraint1' })
  @Max(999999, { message: '区域代码最大为 $constraint1' })
  area_id: string

  @Type(() => Number)
  @IsInt({ message: '页码需要为数字' })
  @Min(1, { message: '页码最小为 $constraint1' })
  currentPage: number

  @Type(() => Number)
  @IsInt({ message: '显示条数需要为数字' })
  @Min(1, { message: '显示条数最小为 $constraint1' })
  pageSize: number

}
