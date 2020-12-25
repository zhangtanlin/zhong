import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany
} from 'typeorm'
import { UserEntity } from '../user/user.entity';

/**
 * 数据表
 * @entity posts 数据库表名
 */
@Entity('role')
export class RoleEntity extends BaseEntity {
  // 用户id(自增id)
  @PrimaryGeneratedColumn()
  id: number

  // 名称
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  name: string

  // 类型【 0 ：超级管理员， 1 ：系统管理员， 2 ：操作员， 3 ：审计员】
  @Column({
    name: 'role_type',
    default: 1,
  })
  roleType: number;

  // 描述
  @Column({
    default: '',
  })
  description: string;

  // 是否是初始化值（缺省）【 0 ：不是， 1 ：是】
  @Column({
    name: 'default_flag',
    default: 0,
  })
  defaultFlag: number;
  
  // 角色对应的资源[用逗号分割的资源id组成的字符串]
  @Column({
    name: 'resources',
    default: '',
  })
  resources: string;
}
