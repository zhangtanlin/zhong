import { Field, InputType } from "type-graphql";

/**
 * 新增
 */
@InputType()
export class PostsInputDto {

  @Field()
  account: string;

  @Field()
  password: string;

}
