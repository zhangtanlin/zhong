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
  @IsNotEmpty({ message: 'md5不能为空' })
  md5: string
}
