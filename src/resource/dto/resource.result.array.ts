/**
 * 导入
 * @requires [ResourceEntity] - 资源表
 */
import { ResourceEntity } from '../entity/resource.entity'

/**
 * dto返回值验证【返回数据库字段】
 */
export class ResourceResultArrayDto {
  code: number

  message: string

  data: ResourceEntity[]
}