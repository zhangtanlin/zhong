import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import * as Moment from 'moment'
import { Exclude } from 'class-transformer'

// version 数据表
@Entity('version')
export class VersionEntity {
  // id（自增id）
  @PrimaryGeneratedColumn()
  id: number

  // 版本号
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  version: string

  // 下载链接
  @Column({
    type: 'varchar',
    default: ''
  })
  downloadUrl: string

  // 更新说明
  @Column({
    type: 'varchar',
    default: ''
  })
  description: string

  /**
   * 是否强更
   * @param {enum} [stronger] - 类型{1:是,2:否}
   */
   @Column({
    type: 'enum',
    enum: [1, 2],
    default: 1
  })
  stronger: 1 | 2

  /**
   * 系统维护公告
   */
  @Column({
    type: 'varchar',
    default: ''
  })
  announcement: string

  // 状态{1:"正常", 2: "不正常"}
  @Column({
    type: 'enum',
    enum: ['1', '2'],
    default: '1'
  })
  status: string

  // 创建时间(使用momentjs把当前时间转换成时间字符串)
  @Column({
    type: 'datetime',
    default: Moment().format('YYYY-MM-DD HH:mm:ss')
  })
  create_time: Date
}
