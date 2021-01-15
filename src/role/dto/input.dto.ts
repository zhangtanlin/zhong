import { Field, InputType } from "type-graphql";

/**
 * 新增
 */
@InputType()
export class RoleInputDto {

  @Field()
  name: string;

  @Field()
  roleType: number;

  @Field()
  description: string;

  @Field()
  defaultFlag: number;

  @Field()
  resources: string
}
