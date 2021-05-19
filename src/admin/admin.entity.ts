/**
 * @requires [Entity]                 - typeorm导出的entity模块
 * @requires [Column]                 - typeorm导出的Column模块
 * @requires [PrimaryGeneratedColumn] - typeorm导出的PrimaryGeneratedColumn模块
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import * as Moment from 'moment'
import { Exclude } from 'class-transformer'

// admin 数据表
@Entity('admin')
export class AdminEntity {
  // 用户id（自增id）
  @PrimaryGeneratedColumn()
  id: number

  // 账号
  @Column({
    type: 'varchar',
    length: 255,
    default: ""
  })
  account: string

  // 用户名
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

  // 头像
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  avatar: string

  // 手机号码
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  phone: string

  // 邮箱
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  email: string

  // 年龄
  @Column({
    type: 'int',
    default: null
  })
  age: number

  // 区域id（6位区域代码）
  @Column({
    type: 'char',
    length: 6,
    default: '000000'
  })
  area: string

  // 角色id（以英文逗号分隔组成角色id字符串）
  @Column({
    type: 'varchar',
    default: ''
  })
  roles: string

  // 是否激活{1:"已激活", 2:"未激活"}
  @Column({
    type: 'enum',
    enum: ['1', '2'],
    default: '1'
  })
  status: string

  // 激活时间
  @Column({
    type: 'datetime',
    default: Moment().format('YYYY-MM-DD HH:mm:ss')
  })
  activate_time: Date

  // 是否第一次登录{1:"是", 2: "不是"}
  @Column({
    type: 'enum',
    enum: ['1', '2'],
    default: '1'
  })
  is_first_login: string

  // 是否锁定{1:"锁定", 2: "未锁定"}
  @Column({
    type: 'enum',
    enum: ['1', '2'],
    default: '2'
  })
  is_locked: string

  // 锁定时间
  @Column({
    type: 'datetime',
    default: null
  })
  locked_time: Date

  // 是否禁用{1:"禁用", 2: "未禁用"}
  @Column({
    type: 'enum',
    enum: ['1', '2'],
    default: '2'
  })
  is_disabled: string

  // 禁用时间
  @Column({
    type: 'datetime',
    default: null
  })
  disabled_time: Date

  // 最后一次登录的ip
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  last_login_ip: string

  // 最后一次登录的时间
  @Column({
    type: 'datetime',
    default: null
  })
  last_login_time: Date

  // 最后一次更新密码的时间
  @Column({
    type: 'datetime',
    default: null
  })
  last_update_password_time: Date

  // 创建时间(使用momentjs把当前时间转换成时间字符串)
  @Column({
    type: 'datetime',
    default: Moment().format('YYYY-MM-DD HH:mm:ss')
  })
  create_time: Date

  // 部门
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  department: string

  // 公司
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  firm: string
}
