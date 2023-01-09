/**
 * @requires [Entity]                 - typeorm导出的entity模块
 * @requires [Column]                 - typeorm导出的Column模块
 * @requires [PrimaryGeneratedColumn] - typeorm导出的PrimaryGeneratedColumn模块
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('download')
// 下载数据表
export class DownloadEntity {
  /**
   * 下载id
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

  // 地址
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  url: string
}
