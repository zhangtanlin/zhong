/**
 * @requires [Entity]                 - typeorm导出的entity模块
 * @requires [Column]                 - typeorm导出的Column模块
 * @requires [PrimaryGeneratedColumn] - typeorm导出的PrimaryGeneratedColumn模块
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import * as Moment from 'moment'

@Entity('upload')
/**
 * user数据表
 */
export class UploadEntity {
  /**
   * id
   * @param {number} [id] - 自增id
   */
  @PrimaryGeneratedColumn()
  id: number

  /**
   * 类型{1:图片,2:视频,}
   */
  @Column({
    type: 'enum',
    enum: [1, 2],
    default: 1
  })
  type: number

  /**
   * 文件名
   */
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  name: string

  /**
   * 文件md5值
   */
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  md5: string

  /**
   * 文件后缀
   */
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  suffix: string

  /**
   * 宽度
   */
  @Column({
    type: 'int',
    default: null
  })
  width: number

  /**
   * 高度
   */
  @Column({
    type: 'int',
    default: null
  })
  height: number

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
   * 更新时间
   * @param {date} [create_time] - 使用momentjs把当前时间转换成时间字符串
   */
  @Column({
    type: 'datetime',
    default: Moment().format('YYYY-MM-DD HH:mm:ss')
  })
  upload_time: Date
}
