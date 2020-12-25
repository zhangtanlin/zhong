import { Field, ID, ObjectType } from '@nestjs/graphql';
import { RoleDto } from 'src/role/dto/dto';

/**
 * 查询
 */
@ObjectType()
export class UserDto {

  @Field(() => ID)
  id: number;

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
  roles: [RoleDto];

  @Field()
  status: number;

  @Field()
  activate_time: string;

  @Field()
  is_first_login: number;

  @Field()
  is_locked: number;

  @Field()
  locked_time: string;

  @Field()
  is_disabled: number;

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