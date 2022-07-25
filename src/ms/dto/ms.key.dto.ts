import { Type } from 'class-transformer'
import {
  IsNotEmpty,
  MaxLength,
} from 'class-validator'

// 微服务的key验证
export class MsKeyDto {
  // 账号
  @Type(() => String)
  @IsNotEmpty({ message: 'key的值不能为空' })
  @MaxLength(255, { message: '账号长度最长为 $constraint1' })
  ms: string
}
