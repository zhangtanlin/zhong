import { Field, ID, ObjectType } from '@nestjs/graphql';

/**
 * 查询
 */
@ObjectType()
export class ResourceDto {

  @Field(() => ID)
  id: number;

  @Field()
  pid: number;

  @Field()
  name: string;

  @Field()
  alias: string;

  @Field()
  type: number;

  @Field()
  href: string;

  @Field()
  target: string;

  @Field()
  icon: string;

  @Field()
  isShow: number;

  @Field()
  isNavigation: number;

  @Field()
  permission: string;

  @Field()
  description: string;
}