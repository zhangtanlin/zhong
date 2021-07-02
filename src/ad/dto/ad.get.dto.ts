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
 * 查询dto验证
 * @param {number} [type] - 类型
 */
export class AdGetDto {

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: '请输入类型' })
  type: number
}
