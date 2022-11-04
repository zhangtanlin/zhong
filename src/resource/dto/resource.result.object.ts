/**
 * 导入
 * @requires [ResourceEntity] - 资源表
 */
import { ResourceEntity } from '../resource.entity'

/**
 * dto返回值验证【返回数据库字段】
 */
export class ResourceResultObjectDto {
  code: number

  message: string

  data: ResourceEntity
}
