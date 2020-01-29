/**
 * @requires [Entity]                 - typeorm导出的entity模块
 * @requires [Column]                 - typeorm导出的Column模块
 * @requires [PrimaryGeneratedColumn] - typeorm导出的PrimaryGeneratedColumn模块
 */
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

/**
 * resource【资源】数据表
 */
@Entity('resource')
export class ResourceEntity {
  /**
   * 资源id
   * @param {number} [id] - 资源id（自增）
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 资源父id
   * @param {number} [id] - 资源父id
   */
  @Column({
    type: "int",
    default: 0
  })
  pid: number;
  
  /**
   * 资源名称
   * @param {string} [name] - 资源名称
   */
  @Column({
    type: "varchar",
    length: 255
  })
  name: string;

  /**
   * 资源别名
   * @param {string} [name] - 资源别名
   */
  @Column({
    type: "varchar",
    length: 255
  })
  alias: string;

  /**
   * 资源类型
   * @param {number} [type] - 资源类型{1:"菜单",2:"按钮"}
   */
  @Column({
    type: "int",
    default: 1
  })
  type: number;

  /**
   * 路由地址
   * @param {string} [url] - 路由地址【路由跳转地址】
   */
  @Column({
    type: "varchar",
    length: 255
  })
  href: string;
  
  /**
   * 组件地址
   * @param {string} [url] - 组件地址【关联的view的组件路径】
   */
  @Column({
    type: "varchar",
    length: 255
  })
  target: string;

  /**
   * 图标
   */
  @Column({
    type: "varchar",
    length: 255,
    default: "el-icon-edit"
  })
  icon: string;
  
  /**
   * 是否显示
   * @param {number} [is_show] - 是否显示{0:"不显示",1:"显示"}
   */
  @Column({
    type: "int",
    default: 1
  })
  is_show: number;
  
  /**
   * 是否是导航栏
   * @param {number} [is_navigation] - 是否是导航栏{0:"不是导航栏",1:"是导航栏"}
   */
  @Column({
    type: "int",
    default: 1
  })
  is_navigation: number;
  
  /**
   * 权限
   * @param {string} [permission] -  权限【由web/sys:路由:method】例如web:home:get
   */
  @Column({
    type: "varchar",
    length: 255,
    default: ""
  })
  permission: string;

  /**
   * 说明
   */
  @Column({
    type: "varchar",
    length: 255,
    default: ""
  })
  description: string;
}
