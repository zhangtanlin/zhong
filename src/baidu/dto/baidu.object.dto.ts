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
export enum BaiduType {
  software = 1,
  hardware = 2,
  Auditor = 3
}

// 百度表的对象验证
export class BaiduObjectDto {

  // 名称
  @IsOptional()
  @Type(() => String)
  @IsString({
    message: '名称应为字符串'
  })
  name: string

  /**
   * 类型
   * @descript {1:"软件", 2:"硬件"}
   */
  @IsOptional()
  @Type(() => Number)
  @IsEnum(BaiduType, {
    message: '资源类型只能为1或2'
  })
  type: number

  // 描述
  @IsOptional()
  @Type(() => String)
  @MaxLength(255, {
    message: '描述最长为255'
  })
  describe: string

  // 应用Id
  @IsOptional()
  @Type(() => String)
  @MaxLength(255, {
    message: '应用Id最长为255'
  })
  app_id: string

  // 应用Key
  @IsOptional()
  @Type(() => String)
  @MaxLength(255, {
    message: '应用Key最长为255'
  })
  app_key: string

  // 密钥key
  @IsOptional()
  @Type(() => String)
  @MaxLength(255, {
    message: '密钥key最长为255'
  })
  secret_key: string

  // 签名key
  @IsOptional()
  @Type(() => String)
  @MaxLength(255, {
    message: '签名key最长为255'
  })
  sign_key: string
}
