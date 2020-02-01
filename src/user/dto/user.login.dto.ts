/**
 * 导入
 */
import { IsNotEmpty, MinLength, MaxLength } from "class-validator";
import { ApiModelProperty } from '@nestjs/swagger'

/**
 * 登陆验证类
 */
export class UserLoginDto {
  /**
   * 账号
   */
  @ApiModelProperty()
  @IsNotEmpty({ message: "账号不能为空" })
  @MaxLength(255, { message: "账号长度最长为 $constraint1" })
  account: string;

  /**
   * 密码
   */
  @ApiModelProperty()
  @IsNotEmpty({ message: "密码不能为空" })
  @MinLength(3, { message: "密码长度最少为 $constraint1 ,但实际为 $value" })
  @MaxLength(255, { message: "密码长度最长为 $constraint1" })
  password: string;
}
