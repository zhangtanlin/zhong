import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import * as Moment from 'moment'

/**
 * 数据表
 * @entity posts 数据库表名
 */
@Entity('user')
export class UserEntity extends BaseEntity {
  // 用户id(自增id)
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

  // 密码
  @Column({
    type: 'varchar',
    length: 255,
    default: ""
  })
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

  // 区域id(6位区域代码)
  @Column({
    type: 'char',
    length: 6,
    default: '000000'
  })
  area_id: string

  // 角色id(角色id组成的字符串【以特殊符号（中文逗号、英文逗号）分隔】)
  @Column({
    type: 'varchar',
    length: 255,
    default: null
  })
  roles: string

  // 是否激活{0:"未激活",1:"已激活"}
  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 1
  })
  status: number

  // 激活时间
  @Column({
    type: 'datetime',
    default: Moment().format('YYYY-MM-DD HH:mm:ss')
  })
  activate_time: Date

  // 是否第一次登录{0: "不是", 1:"是"}
  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 1
  })
  is_first_login: number

  // 是否锁定{0: "未锁定", 1:"锁定"}
  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 0
  })
  is_locked: number

  // 锁定时间
  @Column({
    type: 'datetime',
    default: null
  })
  locked_time: Date

  // 是否禁用{0: "未禁用", 1:"禁用"}
  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 0
  })
  is_disabled: number

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
