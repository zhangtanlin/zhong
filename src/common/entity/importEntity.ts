/**
 * entity导入
 * @requires [UserEntity]     - 用户表
 * @requires [RoleEntity]     - 角色
 * @requires [resourceEntity] - 资源
 */
import { UserEntity } from "../../user/entity/user.entity";
import { RoleEntity } from "../../role/entity/role.entity";
import { ResourceEntity } from "../../resource/entity/resource.entity";

/**
 * allEntity导出
 * @module [allEntity] - 导出的entity数组
 */
export const allEntity: any[] = [
  UserEntity,
  RoleEntity,
  ResourceEntity,
];
