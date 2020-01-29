/**
 * 导入
 */
import { IsNotEmpty, MinLength, MaxLength, IsOptional, IsPositive, IsInt, Min } from "class-validator";
import { Type } from "class-transformer";

/**
 * 查询用户dto验证
 * @param {number} [id]   - 用户id【可以为数字且最小值为1，或者不填】
 * @param {string} [name] - 用户名【最长长度为255，或者不填】
 */
export class UserGetDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "id需要为数字" })
  @Min(0, { message: "id最小为 $constraint1" })
  id: number;

  @IsOptional()
  @MaxLength(255, { message: "用户名长度最长为 $constraint1" })
  name: string;
}
