import { IsNotEmpty, MinLength, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

// 管理员登陆验证 dto 类
export class AdminLoginDto {
  // 账号
  @ApiProperty()
  @IsNotEmpty({ message: '账号不能为空' })
  @MaxLength(255, { message: '账号长度最长为 $constraint1' })
  account: string

  // 密码
  @ApiProperty()
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(3, { message: '密码长度最少为 $constraint1 ,但实际为 $value' })
  @MaxLength(255, { message: '密码长度最长为 $constraint1' })
  password: string
}
