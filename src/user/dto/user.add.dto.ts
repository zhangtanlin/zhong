/**
 * 导入
 * @requires [ApiModelProperty] - api文档【标注sawgger可访问的类属性】
 */
import { IsNotEmpty, MinLength, MaxLength, IsOptional, IsPositive } from "class-validator";
import { ApiModelProperty } from '@nestjs/swagger'

/**
 * 新增用户dto验证
 * @param {string} [name]     - 用户名【不能为空，长度为】
 * @param {string} [password] - 密码  【不能为空，长度至少为3，长度最大为255】
 * @param {string} [avatar]   - 头像  【为空（最长长度为255）或者不填】
 * @param {number} [roles]    - 角色id【正整数】
 */
export class UserAddDto {
  @ApiModelProperty()
  @IsNotEmpty({ message: "用户名不能为空" })
  @MaxLength(255, { message: "用户名长度最长为 $constraint1" })
  name: string;

  @ApiModelProperty()
  @IsNotEmpty({ message: "密码不能为空" })
  @MinLength(3, { message: "密码长度最少为 $constraint1 ,但实际为 $value" })
  @MaxLength(255, { message: "密码长度最长为 $constraint1" })
  password: string;

  @ApiModelProperty()
  @IsOptional()
  @MinLength(1, { message: "密码长度最少为 $constraint1 ,但实际为 $value" })
  @MaxLength(255, { message: "头像地址长度最长为 $constraint1" })
  avatar: string;

  @ApiModelProperty()
  @IsOptional()
  @IsPositive({
    message: '角色代码需要为正整数',
  })
  roles: number;
}
