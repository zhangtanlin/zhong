import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

/**
 * 查询
 */
@ObjectType()
export class PostsDto {

  @Field(() => ID)
  id: number;

  @Field()
  account: string;

  @Field()
  password: string;

}