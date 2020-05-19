/**
 * @requires [Entity]                 - typeorm导出的entity模块
 * @requires [Column]                 - typeorm导出的Column模块
 * @requires [PrimaryGeneratedColumn] - typeorm导出的PrimaryGeneratedColumn模块
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('ad')
/**
 * 数据表名
 */
export class AdEntity {
  /**
   * id
   * @param {number} [id] - 自增id
   */
  @PrimaryGeneratedColumn()
  id: number

  /**
   * 名称
   */
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  name: string

  /**
   * 类型{1:banner}
   */
  @Column({
    type: 'int',
    default: 1
  })
  type: number

  /**
   * 图片地址
   */
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  src: string

  /**
   * 连接地址
   */
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  link: string

  /**
   * 状态
   * @description - {0: 关闭, 1: 开启}
   */
  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 1
  })
  status: string

  /**
   * 描述
   */
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  explanation: string
}
