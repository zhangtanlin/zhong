/**
 * @requires [Entity]                 - typeorm导出的entity模块
 * @requires [Column]                 - typeorm导出的Column模块
 * @requires [PrimaryGeneratedColumn] - typeorm导出的PrimaryGeneratedColumn模块
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('config')
// 配置信息 config 数据表
export class ConfigEntity {
  // 自增id
  @PrimaryGeneratedColumn()
  id: string

  // 测试服 api 接口地址
  @Column({
    name: 'dev_api',
    type: 'varchar',
    length: 255,
    default: ''
  })
  devApi: string

  // 正式服 api 接口地址
  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  api: string

  // 正式服 api 接口备用地址
  @Column({
    name: 'github_api',
    type: 'varchar',
    length: 255,
    default: ''
  })
  githubApi: string

  // tf 线路地址
  @Column({
    name: 'tf_api',
    type: 'varchar',
    length: 255,
    default: ''
  })
  tfApi: string

  // tf 备用线路地址
  @Column({
    name: 'tf_github_api',
    type: 'varchar',
    length: 255,
    default: ''
  })
  tfGithubApi: string

  // 图片基础地址
  @Column({
    name: 'image_host',
    type: 'varchar',
    length: 255,
    default: ''
  })
  imageHost: string

  // 上传图片加密 key
   @Column({
    name: 'upload_image_key',
    type: 'varchar',
    length: 255,
    default: ''
  })
  uploadImageKey: string

  // 上传图片地址
   @Column({
    name: 'upload_image_url',
    type: 'varchar',
    length: 255,
    default: ''
  })
  uploadImageUrl: string

  // 上传视频 key
   @Column({
    name: 'upload_video_key',
    type: 'varchar',
    length: 255,
    default: ''
  })
  uploadVideoKey: string

  // 上传视频地址
   @Column({
    name: 'upload_video_url',
    type: 'varchar',
    length: 255,
    default: ''
  })
  uploadVideoUrl: string
}
