/**
 * 导入
 * @requires [ApiModelProperty] - api文档【标注sawgger可访问的类属性】
 */
import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsPositive,
  IsEnum,
  IsInt,
  Min
} from 'class-validator'
import { Type } from 'class-transformer'

/**
 * 角色类型枚举
 * @param {number} [root]     - 超级管理员
 * @param {number} [operator] - 操作员
 * @param {number} [auditor]  - 审计员
 * @param {number} [other]    - 其他
 */
export enum RoleTypes {
  root = 1,
  operator = 2,
  auditor = 3,
  other = 4
}

/**
 * 查询角色dto验证
 * @param {number} [id]          - id
 * @param {string} [name]        - 名称【不能为空，长度为】
 * @param {string} [type]        - 类型【不能为空，长度至少为3，长度最大为255】
 * @param {string} [currentPage] - 页码
 * @param {string} [pageSize]    - 每页显示的条数
 */
export class RoleGetDto {

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'id需要为数字' })
  @Min(0, { message: 'id最小为 $constraint1' })
  id: number

  @IsOptional()
  @Type(() => Number)
  @IsNotEmpty({ message: '名称不能为空' })
  @MaxLength(255, { message: '名称长度最长为 $constraint1' })
  name: string

  @IsOptional()
  @Type(() => Number)
  @IsNotEmpty({ message: '类型不能为空' })
  @IsEnum(RoleTypes)
  type: number

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: '页码需要为数字' })
  @Min(1, { message: '页码最小为 $constraint1' })
  currentPage: number

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: '显示条数需要为数字' })
  @Min(1, { message: '显示条数最小为 $constraint1' })
  pageSize: number
}
