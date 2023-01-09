/**
 * @requires [Entity]                 - typeorm导出的entity模块
 * @requires [Column]                 - typeorm导出的Column模块
 * @requires [PrimaryGeneratedColumn] - typeorm导出的PrimaryGeneratedColumn模块
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('guess')

// guess竞猜活动数据表
export class GuessEntity {
  /**
   * id
   * @param {number} [id] - 自增id
   */
  @PrimaryGeneratedColumn()
  id: number

  // 名称
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  name: string

  // 活动图片
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  src: string

  // 时间
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  time: string

  /**
   * 状态
   * @description - {0: 活动结束, 1: 活动开启, 2: 活动停止下注}
   */
  @Column({
    type: 'enum',
    enum: [0, 1, 2],
    default: 1
  })
  status: string

  /**
   * 是否中奖
   * @description - {0: 未中奖, 1: 中奖}
   */
  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 0
  })
  result: string

  // 中奖结果【谁中奖】
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  end: string

  // 中奖描述
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  explanation: string
}
