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
 * 视频类型枚举
 * @param {number} [preview] - 预览视频
 * @param {number} [formal]  - 正式视频
 */
export enum VideoTypes {
  preview = 1,
  formal = 2
}

/**
 * 新增dto验证
 * @param {string} [name]     - 名称【不能为空，长度为】
 * @param {string} [password] - 类型【不能为空，长度至少为3，长度最大为255】
 */
export class VideoAddDto {
  @IsNotEmpty({ message: '名称不能为空' })
  @MaxLength(255, { message: '名称长度最长为 $constraint1' })
  name: string

  @IsNotEmpty({ message: '类型不能为空' })
  @IsEnum(VideoTypes)
  type: number

  @IsNotEmpty({ message: '视频地址不能为空' })
  @MaxLength(255, { message: '视频地址长度最长为 $constraint1' })
  url: string
}
