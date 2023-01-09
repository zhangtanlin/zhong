import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import * as Moment from 'moment'

// 初始化数据库命令
// SELECT * FROM website.baidu;
// use website;
// insert into baidu (name, type, resources) value ("超级管理员", 1, "1"),("操作员", 2, "1"), ("审计员", 3, "1"), ("其他", 4, "1");

/**
 * baidu云数据表
 */
@Entity('baidu')
export class BaiduEntity {
  @PrimaryGeneratedColumn()
  id: number

  // 应用名称
  @Column({
    type: 'varchar',
    length: 255,
    default: ""
  })
  name: string

  /**
   * 应用类型
   * @description {1:软件,2:硬件}
   */
  @Column({
    type: 'enum',
    enum: [1, 2],
    default: 1
  })
  type: 1 | 2

  // 应用描述
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  describe: string

  // 应用Id
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  app_id: string

  // 应用Key
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  app_key: string

  // 密钥key
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  secret_key: string

  // 签名key
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  sign_key: string

  // 创建时间(使用momentjs把当前时间转换成时间字符串)
  @Column({
    type: 'datetime',
    default: Moment().format('YYYY-MM-DD HH:mm:ss')
  })
  create_time: Date
}
