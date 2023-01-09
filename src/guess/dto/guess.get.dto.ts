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
 * 查询dto验证
 * @param {string} [currentPage] - 当前页码【最小为1】
 * @param {string} [pageSize]    - 显示条数【最小为1】
 */
export class GuessGetDto {
  // 页码
  @Type(() => Number)
  @IsInt({ message: '页码需要为数字' })
  currentPage: number

  // 每页展示的条数
  @Type(() => Number)
  @IsInt({ message: '显示条数需要为数字' })
  pageSize: number
}
