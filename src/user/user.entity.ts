/**
 * @requires [Entity]                 - typeorm导出的entity模块
 * @requires [Column]                 - typeorm导出的Column模块
 * @requires [PrimaryGeneratedColumn] - typeorm导出的PrimaryGeneratedColumn模块
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import * as Moment from 'moment'
import { Exclude } from 'class-transformer'

// 初始化数据库命令
// SELECT * FROM website.user;
// use website;
// insert into user (account, name, roles, password) value ("root", "超级管理员", 1, "6d67d2209e45e3d74d853e82481010abb8570fd82ffa74821d091cbd6c8244d967f2a3402f1715039cf1046ef46589ec57ea44e970b90128f5d11cedfbbf150b"),("admin", "操作员", 2, "6d67d2209e45e3d74d853e82481010abb8570fd82ffa74821d091cbd6c8244d967f2a3402f1715039cf1046ef46589ec57ea44e970b90128f5d11cedfbbf150b"), ("audit", "审计员", 3, "6d67d2209e45e3d74d853e82481010abb8570fd82ffa74821d091cbd6c8244d967f2a3402f1715039cf1046ef46589ec57ea44e970b90128f5d11cedfbbf150b");

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
  id: number

  /**
   * 账号
   */
  @Column({
    type: 'varchar',
    length: 255,
    default: ""
  })
  account: string

  /**
   * 用户名
   */
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  name: string

  /**
   * 密码
   * @Exclude 表示返回时排除（不显示）
   */
  @Column({
    type: 'varchar',
    length: 255,
    default: ""
  })
  @Exclude()
  password: string

  /**
   * 头像
   */
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  avatar: string

  /**
   * 手机号码
   */
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  phone: string

  /**
   * 邮箱
   */
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  email: string

  /**
   * 年龄
   */
  @Column({
    type: 'int',
    default: null
  })
  age: number

  /**
   * 区域id
   * @param {string} [area_id] - 6位区域代码
   */
  @Column({
    type: 'char',
    length: 6,
    default: '000000'
  })
  area_id: string

  /**
   * 角色id
   * @param {string} [roles] - 角色id组成的字符串【以特殊符号（中文逗号、英文逗号）分隔】
   */
  @Column({
    type: 'varchar',
    default: ''
  })
  roles: string

  /**
   * 是否激活
   * @param {number} [status] - {1:"已激活", 2:"未激活"}
   */
  @Column({
    type: 'enum',
    enum: [1, 2],
    default: 1
  })
  status: number

  /**
   * 激活时间
   */
  @Column({
    type: 'datetime',
    default: Moment().format('YYYY-MM-DD HH:mm:ss')
  })
  activate_time: Date

  /**
   * 是否第一次登录
   * @param {number} [is_first_login] -是否是第一次登录 {1:"是", 2: "不是"}
   */
  @Column({
    type: 'enum',
    enum: ['1', 2],
    default: 1
  })
  is_first_login: number

  /**
   * 是否锁定
   * @param {number} [is_locked] -是否锁定 {1:"锁定", 2: "未锁定"}
   */
  @Column({
    type: 'enum',
    enum: [1, 2],
    default: 2
  })
  is_locked: number

  /**
   * 锁定时间
   */
  @Column({
    type: 'datetime',
    default: null
  })
  locked_time: Date

  /**
   * 是否禁用
   * @param {number} [is_disabled] -是否禁用 {1:"禁用", 2: "未禁用"}
   */
  @Column({
    type: 'enum',
    enum: [1, 2],
    default: 2
  })
  is_disabled: number

  /**
   * 禁用时间
   */
  @Column({
    type: 'datetime',
    default: null
  })
  disabled_time: Date

  /**
   * 最后一次登录的ip
   */
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  last_login_ip: string

  /**
   * 最后一次登录的时间
   */
  @Column({
    type: 'datetime',
    default: null
  })
  last_login_time: Date

  /**
   * 最后一次更新密码的时间
   */
  @Column({
    type: 'datetime',
    default: null
  })
  last_update_password_time: Date

  /**
   * 创建时间
   * @param {date} [create_time] - 使用momentjs把当前时间转换成时间字符串
   */
  @Column({
    type: 'datetime',
    default: Moment().format('YYYY-MM-DD HH:mm:ss')
  })
  create_time: Date

  /**
   * 部门
   */
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  department: string

  /**
   * 公司
   */
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  firm: string
}
