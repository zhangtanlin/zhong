import { Field, InputType } from "type-graphql";

/**
 * 状态枚举
 * @param {String} '1' 已激活
 * @param {String} '2' 未激活
 */
export enum userStatus {
  yes = '1',
  no = '2',
}

/**
 * 新增
 */
@InputType()
export class UserInputDto {

  @Field()
  account: string;

  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  avatar: string;

  @Field()
  phone: string;

  @Field()
  email: string;

  @Field()
  age: number;

  @Field()
  area_id: string;

  @Field()
  roles: string;

  @Field()
  status: string;

  @Field()
  activate_time: string;

  @Field()
  is_first_login: string;

  @Field()
  is_locked: string;

  @Field()
  locked_time: string;

  @Field()
  is_disabled: string;

  @Field()
  disabled_time: string;

  @Field()
  last_login_ip: string;

  @Field()
  last_login_time: string;

  @Field()
  last_update_password_time: string;

  @Field()
  create_time: string;

  @Field()
  department: string;

  @Field()
  firm: string;

}
