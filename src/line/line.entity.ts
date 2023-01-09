/**
 * @requires [Entity]                 - typeorm导出的entity模块
 * @requires [Column]                 - typeorm导出的Column模块
 * @requires [PrimaryGeneratedColumn] - typeorm导出的PrimaryGeneratedColumn模块
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

// 数据表名
@Entity('line')
export class LineEntity {
  // 自增id
  @PrimaryGeneratedColumn()
  id: number

  // 名称
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  name: string

  /**
   * 类型
   * @description {1:banner}
   */
  @Column({
    type: 'int',
    default: 1
  })
  type: number

  // 地址
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  address: string
}
