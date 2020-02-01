/**
 * @requires [Entity]                 - typeorm导出的entity模块
 * @requires [Column]                 - typeorm导出的Column模块
 * @requires [PrimaryGeneratedColumn] - typeorm导出的PrimaryGeneratedColumn模块
 */
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import * as Moment from "moment"

@Entity('user')
/**
 * user数据表
 */
export class UserEntity {
  /**
   * 用户id
   * @param {number} [id] - 自增id
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 账号
   */
  @Column({
    type: "varchar",
    length: 255
  })
  account: string;

  /**
   * 用户名
   */
  @Column({
    type: "varchar",
    length: 255,
    default: ""
  })
  name: string;

  /**
   * 密码
   */
  @Column({
    type: "varchar",
    length: 255
  })
  password: string;

  /**
   * 头像
   */
  @Column({
    type: "varchar",
    length: 255,
    default: ''
  })
  avatar: string;
  
  /**
   * 手机号码
   */
  @Column({
    type: "varchar",
    length: 255,
    default: ''
  })
  phone: string;
  
  /**
   * 邮箱
   */
  @Column({
    type: "varchar",
    length: 255,
    default: ''
  })
  email: string;
  
  /**
   * 年龄
   */
  @Column({
    type: "int",
    default: null
  })
  age: number;
  
  /**
   * 区域id
   * @param {string} [area_id] - 6位区域代码
   */
  @Column({
    type: "char",
    length: 6,
    default: "000000"
  })
  area_id: string;

  /**
   * 角色id
   * @param {string} [roles] - 角色id组成的字符串【以特殊符号（中文逗号、英文逗号）分隔】
   */
  @Column({
    type: "varchar",
    default: ""
  })
  roles: string;
  
  /**
   * 账号状态
   * @param {number} [status] - {0:"禁用",1:"启用"}
   */
  @Column({
    type: "enum",
    enum: [0, 1],
    default: 1
  })
  status: number;
    
  /**
   * 激活时间
   */
  @Column({
    type: "datetime",
    default: Moment().format('YYYY-MM-DD HH:mm:ss')
  })
  activate_time: Date;
      
  /**
   * 是否第一次登录
   * @param {number} [is_first_login] -是否是第一次登录 {0: "不是", 1:"是"}
   */
  @Column({
    type: "enum",
    enum: [0, 1],
    default: 1
  })
  is_first_login: number;
  
  /**
   * 是否锁定
   * @param {number} [is_locked] -是否锁定 {0: "未锁定", 1:"锁定"} 
   */
  @Column({
    type: "enum",
    enum: [0, 1],
    default: 0
  })
  is_locked: number;

  /**
   * 锁定时间
   */
  @Column({
    type: "datetime",
    default: null
  })
  locked_time: Date;
  
  /**
   * 是否禁用
   * @param {number} [is_disabled] -是否禁用 {0: "未禁用", 1:"禁用"}
   */
  @Column({
    type: "enum",
    enum: [0, 1],
    default: 0
  })
  is_disabled: number;

  /**
   * 禁用时间
   */
  @Column({
    type: "datetime",
    default: null
  })
  disabled_time: Date;
  
  /**
   * 最后一次登录的ip
   */
  @Column({
    type: "varchar",
    length: 255,
    default: ''
  })
  last_login_ip: string;
  
  /**
   * 最后一次登录的时间
   */
  @Column({
    type: "datetime",
    default: null
  })
  last_login_time: Date;
  
  /**
   * 最后一次更新密码的时间
   */
  @Column({
    type: "datetime",
    default: null
  })
  last_update_password_time: Date;

  /**
   * 创建时间
   * @param {date} [create_time] - 使用momentjs把当前时间转换成时间字符串
   */
  @Column({
    type: "datetime",
    default: Moment().format('YYYY-MM-DD HH:mm:ss')
  })
  create_time: Date;

  /**
   * 部门
   */
  @Column({
    type: "varchar",
    length: 255,
    default: ''
  })
  department: string;

  /**
   * 公司
   */
  @Column({
    type: "varchar",
    length: 255,
    default: ''
  })
  firm: string;
}
