import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'


/**
 * 数据表
 * @entity posts 数据库表名
 * @param  id    自增id
 * @entity name  名称
 * @entity age   年龄
 */
@Entity('posts')
export class PostsEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column(
    {
      type: 'varchar',
      length: 255,
      unique: true,
      default: ''
    },
  )
  account: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  password: string;

}
