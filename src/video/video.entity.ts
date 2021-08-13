/**
 * @requires [Entity]                 - typeorm导出的entity模块
 * @requires [Column]                 - typeorm导出的Column模块
 * @requires [PrimaryGeneratedColumn] - typeorm导出的PrimaryGeneratedColumn模块
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('video')
/**
 * video（视频）数据表
 */
export class VideoEntity {
  /**
   * @param {number} [id] - 视频id（自增）
   */
  @PrimaryGeneratedColumn()
  id: number

  /**
   * @param {string} [name] - 名称
   */
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  name: string

  /**
   * @param {enum} [type] - 类型{1:预览视频,2:正式视频}【枚举是从1开始】
   */
  @Column({
    type: 'enum',
    enum: [1, 2],
    default: 1
  })
  type: 1 | 2

  /**
   * @param {string} [resources] - 视频地址
   */
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  url: string

  /**
   * @param {string} [img_url] - 封面地址
   */
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  img_url: string
}
