/**
 * 导入
 * @requires [ResourceAddDto] - 资源新增dto
 */
import { ResourceAddDto } from './resource.add.dto'

/**
 * 新增dto返回值验证
 */
export class ResourceAddResultDto {
  code: number

  message: string

  data: ResourceAddDto
}
