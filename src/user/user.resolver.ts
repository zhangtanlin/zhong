import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Arg } from 'type-graphql';
import { UserDto } from './dto/dto';
import { UserInputDto } from './dto/input.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {

  constructor(
    private readonly userService: UserService,
  ) { }

  // 查询所有
  @Query(() => [UserDto])
  async userFindAll() {
    try {
      // return await UserEntity.find();
      const find = await this.userService.findUser();
      return find || [];
    } catch (error) {
      return ['错误']
    }
  }

  // 查询一条
  @Query(() => UserDto)
  async userFindOneById(_, @Arg('id') id: number) {
    try {
      return await UserEntity.findOne(id);
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
  @Mutation(() => UserDto)
  async userCreate(_, @Arg('inputDto') inputDto: UserInputDto) {
    const create = await UserEntity.create(inputDto).save()
    return create;
  }
}
