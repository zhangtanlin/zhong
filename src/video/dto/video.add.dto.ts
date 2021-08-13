/**
 * 导入
 * @requires [ApiModelProperty] - api文档【标注sawgger可访问的类属性】
 */
import { Type } from 'class-transformer'
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

// 新增dto验证
export class VideoAddDto {

  @IsNotEmpty({ message: '名称不能为空' })
  @MaxLength(255, { message: '名称长度最长为 $constraint1 ' })
  name: string

  @Type(() => String)
  @IsNotEmpty({ message: 'md5不能为空' })
  @MinLength(1, { message: 'md5长度最少为 $constraint1 ,但实际为 $value' })
  @MaxLength(255, { message: 'md5长度最长为 $constraint1 ' })
  md5: String

  @Type(() => Number)
  @IsNotEmpty({ message: '类型不能为空' })
  @IsEnum(VideoTypes)
  type: number

  @Type(() => String)
  @IsNotEmpty({ message: '视频地址不能为空' })
  @MaxLength(255, { message: '视频地址长度最长为 $constraint1 ' })
  url: string
}
