/**
 * 导入
 */
import { IsNotEmpty, MinLength, MaxLength } from "class-validator";
import { ApiModelProperty } from '@nestjs/swagger'

/**
 * 用户登陆dto验证
 * @param {string} [name]     - 用户名【不能为空，长度为】
 * @param {string} [password] - 密码【不能为空，长度至少为3，长度最大为255】
 */
export class UserLoginDto {
  @ApiModelProperty()
  @IsNotEmpty({ message: "用户名不能为空" })
  @MaxLength(255, { message: "用户名长度最长为 $constraint1" })
  name: string;

  @ApiModelProperty()
  @IsNotEmpty({ message: "密码不能为空" })
  @MinLength(3, { message: "密码长度最少为 $constraint1 ,但实际为 $value" })
  @MaxLength(255, { message: "密码长度最长为 $constraint1" })
  password: string;
}
