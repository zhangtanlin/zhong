/**
 * entity导入表
 * @requires [PostsEntity]    - 测试
 * @requires [UserEntity]     - 用户
 * @requires [RoleEntity]     - 角色
 * @requires [ResourceEntity] - 资源
 */
import { PostsEntity } from 'src/posts/posts.entity';
import { UserEntity } from '../user/user.entity'
import { RoleEntity } from '../role/role.entity'
import { ResourceEntity } from '../resource/resource.entity'

/**
 * 导出
 * @module [allEntity] - 导出的entity数组
 */
const allEntity = [
  PostsEntity,
  UserEntity,
  RoleEntity,
  ResourceEntity
]

export default allEntity;
