/**
 * 导入
 * @requires [IsNotEmpty] - 验证不能为空
 * @requires [MaxLength]  - 验证最长长度
 */
import { IsNotEmpty, MaxLength } from 'class-validator'

/**
 * 新增dto验证
 * @param {string} [name]     - 名称【不能为空，长度为】
 */
export class ResourceAddDto {
  @IsNotEmpty({ message: '资源名称不能为空' })
  @MaxLength(255, { message: '资源名称长度最长为 $constraint1' })
  name: string
}
