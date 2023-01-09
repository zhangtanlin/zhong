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
  IsEnum
} from 'class-validator'

/**
 * 角色类型枚举
 * @param {number} [root]     - 超级管理员
 * @param {number} [operator] - 操作员
 * @param {number} [auditor]  - 审计员
 * @param {number} [other]    - 其他
 */
export enum BaiduTypes {
  root = 1,
  operator = 2,
  auditor = 3,
  other = 4
}

/**
 * 新增dto验证
 * @param {string} [name]     - 名称【不能为空，长度为】
 * @param {string} [password] - 类型【不能为空，长度至少为3，长度最大为255】
 */
export class BaiduAddDto {

  // 名称
  @IsNotEmpty({ message: '名称不能为空' })
  @MaxLength(255, { message: '名称长度最长为 $constraint1' })
  name: string

  // 类型
  @IsNotEmpty({ message: '类型不能为空' })
  @IsEnum(BaiduTypes)
  type: number

  // 资源
  @IsOptional()
  resources: string
}
