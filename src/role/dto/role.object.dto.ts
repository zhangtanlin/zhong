/**
 * 导入
 * @requires [IsOptional] - 如果字段不存在就不进行验证
 * @requires [IsNumber]   - 是否为数值
 * @requires [IsString]   - 是否为字符串
 */
import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  Max,
  IsEnum,
  MaxLength
} from 'class-validator'
import { Type } from 'class-transformer'

/**
 * 【枚举】角色类型
 * @param {number} [root]    - 超级管理员
 * @param {number} [admin]   - 操作员
 * @param {number} [Auditor] - 审计员
 */
export enum RoleType {
  root = 1,
  admin = 2,
  Auditor = 3
}

/**
 * 根据role对象进行验证
 */
export class RoleObjectDto {
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

  // 角色名
  @IsOptional()
  @Type(() => String)
  @IsString({
    message: '资源名应为字符串'
  })
  name: string

  /**
   * 类型
   * @description {1:"超级管理员", 2:"操作员", 3:"审计员"}
   */
  @IsOptional()
  @Type(() => Number)
  @IsEnum(RoleType, {
    message: '资源类型只能为1或2'
  })
  type: number

  // 资源id【以逗号分隔】
  @IsOptional()
  @Type(() => String)
  @IsString({
    message: '资源id应为数字组成的字符串'
  })
  resources: string
}
