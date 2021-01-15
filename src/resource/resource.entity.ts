import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany
} from 'typeorm'
import { RoleEntity } from '../role/role.entity';

/**
 * 数据表
 * @entity resource 数据库表名
 */
@Entity('resource')
export class ResourceEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    default: null,
  })
  pid: number;

  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  alias: string;

  @Column({
    type: 'int',
    default: 1,
  })
  type: number;

  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  href: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  target: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: 'el-icon-edit',
  })
  icon: string;

  @Column({
    name: 'is_show',
    type: 'int',
    default: 1,
  })
  isShow: number;

  @Column({
    name: 'is_navigation',
    type: 'int',
    default: 0,
  })
  isNavigation: number;

  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  permission: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  description: string;
}
