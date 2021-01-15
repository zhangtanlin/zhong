/**
 * 导入
 * @requires [class-validator] - 验证规则
 */
import { IsNotEmpty, IsInt, IsString, IsHash } from "class-validator";

/**
 * 根据md5进行的一系列操作的dto验证
 * @param {number} [md5] - 需要查询表的md5值
 */
export class Md5Dto {
  /**
   * ID
   */
  @IsNotEmpty({ message: 'md5不能为空' })
  @IsHash('md5', { message: '数据应为md5值' })
  md5: string
}
