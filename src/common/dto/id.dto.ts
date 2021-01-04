/**
 * 导入
 * @requires [class-validator] - 验证规则
 */
import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";

/**
 * 根据id进行的一系列操作的dto验证
 * @param {number} [id] - 需要查询表的递增id
 */
export class IdDto {
  /**
   * ID
   */
  @Type(() => Number)
  @IsNotEmpty({ message: 'id不能为空' })
  id: number
}
