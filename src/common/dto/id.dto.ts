/**
 * 导入
 * @requires [class-validator] - 验证规则
 */
import { IsNotEmpty, IsInt } from "class-validator";

/**
 * 根据id进行的一系列操作的dto验证
 * @param {number} [id] - 需要查询表的递增id
 */
export class IdDto {
  /**
   * ID
   */
  @IsNotEmpty({ message: 'id不能为空' })
  @IsInt({ message: 'id为正整数' })
  id: number
}
