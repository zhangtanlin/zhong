import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Arg } from 'type-graphql';
import { PostsDto } from './dto/posts.dto';
import { PostsInputDto } from './dto/posts.input.dto';
import { PostsEntity } from './posts.entity';
import { PostsService } from './posts.service';

@Resolver()
export class PostsResolver {

  constructor(
    private readonly postsService: PostsService,
  ) { }

  // 测试
  @Query(() => String)
  posts() {
    return '你好呀 posts';
  }

  /**
   * 查询所有
   * @return PostsDto 根据grqphql模式返回
   */
  @Query(() => [PostsDto])
  async postsFindAll() {
    try {
      return await PostsEntity.find();
    } catch (error) {
      return ['错误']
    }
  }
  /**
   * 查询一条
   * @return PostsDto 根据grqphql模式返回
   */
  @Query(() => PostsDto)
  async postsFindOneById(_, @Arg('id') id: number) {
    try {
      return await PostsEntity.findOne(id);
    } catch (error) {
      return ['错误']
    }
  }

  /**
   * 新增
   * @param account  参数邮箱 
   * @param password 参数密码 
   * @param _        参数占位符
   * @param Arg      参数-前端传过来的
   */
  @Mutation(() => PostsDto)
  async createPosts(_, @Arg('postsInputDto') postsInputDto: PostsInputDto) {
    const create = await PostsEntity.create(postsInputDto).save()
    return create;
  }
}
