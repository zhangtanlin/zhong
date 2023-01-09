/**
 * @requires [Entity]                 - typeorm导出的entity模块
 * @requires [Column]                 - typeorm导出的Column模块
 * @requires [PrimaryGeneratedColumn] - typeorm导出的PrimaryGeneratedColumn模块
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

// 初始化数据库命令
// SELECT * FROM website.resource;
// use website;
// insert into resource (pid, name, type, href) value
// 	   (0, "首页", 1, "/system/home"),
//     (0, "系统管理", 1, ""),
//     (2, "用户管理", 1, "/system/sysUser"),
//     (2, "角色管理", 1, "/system/sysRole"),
//     (2, "资源管理", 1, "/system/sysResource");

/**
 * resource【资源】数据表
 */
@Entity('resource')
export class ResourceEntity {
  // 资源id（自增）
  @PrimaryGeneratedColumn()
  id: number

  // 资源父id
  @Column({
    type: 'int',
    default: 0
  })
  pid: number

  // 资源名称
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  name: string

  // 资源别名
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  alias: string

  /**
   * 资源类型
   * @description {1:"菜单",2:"按钮"}
   */
  @Column({
    type: 'int',
    default: 1
  })
  type: number

  /**
   * 路由地址【路由跳转地址】
   * @description 路由地址【路由跳转地址】
   */
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  href: string

  /**
   * 组件地址
   * @description 关联的view的组件路径
   */
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  target: string

  // 图标
  @Column({
    type: 'varchar',
    length: 255,
    default: 'el-icon-edit'
  })
  icon: string

  /**
   * 是否显示
   * @description {0:"不显示",1:"显示"}
   */
  @Column({
    type: 'int',
    default: 1
  })
  is_show: number

  /**
   * 是否在导航栏显示
   * @description {0:"不是导航栏",1:"是导航栏"}
   */
  @Column({
    type: 'int',
    default: 1
  })
  is_navigation: number

  /**
   * 权限
   * @description 【由web/sys:路由:method】例如web:home:get
   */
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  permission: string

  // 说明
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  description: string
}
