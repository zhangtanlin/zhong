/**
 * 导入
 * @requires [IsNotEmpty] - 验证不能为空
 * @requires [MaxLength]  - 验证最长长度
 */
import { IsNotEmpty, MaxLength } from 'class-validator'

/**
 * 新增dto验证
 */
export class ResourceAddDto {
  // 名称
  @IsNotEmpty({ message: '名称不能为空' })
  @MaxLength(255, { message: '名称长度最长为 $constraint1' })
  name: string

  // 别名
  @IsNotEmpty({ message: '别名不能为空' })
  @MaxLength(255, { message: '别名长度最长为 $constraint1' })
  alias: string

  // 资源地址
  @IsNotEmpty({ message: '资源地址不能为空' })
  @MaxLength(255, { message: '资源地址长度最长为 $constraint1' })
  target: string

}
