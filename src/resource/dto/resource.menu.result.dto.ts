import { ResourceAddDto } from './resource.add.dto'

// 新增dto返回值验证
export class ResourceMenuResultDto {
  code: number

  message: string

  data: ResourceAddDto[]
}
