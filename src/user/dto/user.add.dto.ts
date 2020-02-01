/**
 * 导入
 */
import { IsNotEmpty, MinLength, MaxLength, IsOptional, IsPositive, IsMobilePhone, IsPhoneNumber, IsEmail, IsNumberString, IsEnum, IsIn, IsDate, IsISBN, IsIP } from "class-validator";

/**
 * 新增用户dto验证
 * @param {string} [password] - 密码  【不能为空，长度至少为3，长度最大为255】
 * @param {string} [avatar]   - 头像  【为空（最长长度为255）或者不填】
 * @param {number} [roles]    - 角色id【正整数】
 */
export class UserAddDto {
  /**
   * 账号
   */
  @IsNotEmpty({ message: "账号不能为空" })
  @MaxLength(255, { message: "账号长度最长为 $constraint1" })
  account: string;
  
  /**
   * 用户名
   */
  @IsOptional()
  @MaxLength(255, { message: "用户名长度最长为 $constraint1" })
  name: string;

  /**
   * 密码
   */
  @IsNotEmpty({ message: "密码不能为空" })
  @MinLength(3, { message: "密码长度最少为 $constraint1 ,但实际为 $value" })
  @MaxLength(255, { message: "密码长度最长为 $constraint1" })
  password: string;

  /**
   * 头像
   */
  @IsOptional()
  @MinLength(1, { message: "头像地址长度最少为 $constraint1 ,但实际为 $value" })
  @MaxLength(255, { message: "头像地址长度最长为 $constraint1" })
  avatar: string;

  /**
   * 手机号码
   */
  @IsOptional()
  @IsPhoneNumber("")
  phone: string;
  
  /**
   * 邮箱
   */
  @IsOptional()
  @IsEmail()
  email: string;

  /**
   * 年龄
   */
  @IsOptional()
  @IsPositive({ message: "年龄需要为正整数" })
  age: number;

  /**
   * 区域id
   */
  @IsOptional()
  @IsNumberString({ message: "区域id应为数字字符串" })
  area_id: string;

  /**
   * 角色id
   */
  @IsOptional()
  @MinLength(1, { message: "角色id长度最少为 $constraint1 ,但实际为 $value" })
  @MaxLength(255, { message: "角色id长度最长为 $constraint1" })
  roles: string;
  
  /**
   * 账号状态
   */
  @IsOptional()
  @IsIn([0, 1])
  status: number;

  /**
   * 激活时间
   */
  @IsOptional()
  @IsDate({ message: "激活时间应为日期类型" })
  activate_time: Date;
    
  /**
   * 是否第一次登录
   */
  @IsOptional()
  @IsIn([0, 1])
  is_first_login: number
      
  /**
   * 是否锁定
   */
  @IsOptional()
  @IsIn([0, 1])
  is_locked: number

  /**
   * 锁定时间
   */
  @IsOptional()
  @IsDate({ message: "锁定时间应为日期类型" })
  locked_time: Date;

  /**
   * 是否禁用
   */
  @IsOptional()
  @IsIn([0, 1])
  is_disabled: number

  /**
   * 禁用时间
   */
  @IsOptional()
  @IsDate({ message: "禁用时间应为日期类型" })
  disabled_time: Date;

  /**
   * 最后一次登录的ip
   */
  @IsOptional()
  @IsIP()
  last_login_ip: string;

  /**
   * 最后一次登录的时间
   */
  @IsOptional()
  @IsDate({ message: "最后一次登录的时间应为日期类型" })
  last_login_time: Date;

  /**
   * 创建时间
   */
  @IsOptional()
  @IsDate({ message: "创建时间应为日期类型" })
  create_time: Date;

  /**
   * 部门
   */
  @IsOptional()
  @MinLength(1, { message: "部门长度最少为 $constraint1 ,但实际为 $value" })
  @MaxLength(255, { message: "部门长度最长为 $constraint1" })
  department: string;

  /**
   * 公司
   */
  @IsOptional()
  @MinLength(1, { message: "公司长度最少为 $constraint1 ,但实际为 $value" })
  @MaxLength(255, { message: "公司长度最长为 $constraint1" })
  firm: string;
}
