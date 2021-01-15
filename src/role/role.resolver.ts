import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Arg } from 'type-graphql';
import { RoleDto } from './dto/dto';
import { RoleInputDto } from './dto/input.dto';
import { RoleEntity } from './role.entity';
import { RoleService } from './role.service';

@Resolver()
export class RoleResolver {

  constructor(
    private readonly roleService: RoleService,
  ) { }

  // 查询所有
  @Query(() => [RoleDto])
  async roleFindAll() {
    try {
      const find = await this.roleService.findAll();
      return find || [];
    } catch (error) {
      return ['错误']
    }
  }

  // 查询一条
  @Query(() => RoleDto)
  async roleFindOneById(_, @Arg('id') id: number) {
    try {
      return await RoleEntity.findOne(id);
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
  @Mutation(() => RoleDto)
  async roleCreate(_, @Arg('inputDto') inputDto: RoleInputDto) {
    const create = await RoleEntity.create(inputDto).save()
    return create;
  }
}
