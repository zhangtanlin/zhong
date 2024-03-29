/**
 * @requires [Entity]                 - typeorm导出的entity模块
 * @requires [Column]                 - typeorm导出的Column模块
 * @requires [PrimaryGeneratedColumn] - typeorm导出的PrimaryGeneratedColumn模块
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

// 初始化数据库命令
// SELECT * FROM website.role;
// use website;
// insert into role (name, type, resources) value ("超级管理员", 1, "1"),("操作员", 2, "1"), ("审计员", 3, "1"), ("其他", 4, "1");

@Entity('role')
/**
 * role（角色）数据表
 */
export class RoleEntity {
  /**
   * 角色id
   * @param {number} [id] - 角色id（自增）
   */
  @PrimaryGeneratedColumn()
  id: number

  /**
   * 角色名称
   * @param {string} [name] - 角色名
   */
  @Column({
    type: 'varchar',
    length: 255,
    default: ""
  })
  name: string

  /**
   * 角色类型
   * @param {enum} [type] - 类型{1:超级管理员,2:操作员,3:审计员, 4:其他}【枚举是从1开始】
   */
  @Column({
    type: 'enum',
    enum: [1, 2, 3, 4],
    default: 1
  })
  type: 1 | 2 | 3 | 4

  /**
   * 资源
   * @param {string} [resources] - 资源id集合【以逗号分割的资源id字符串】
   */
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  resources: string
}
