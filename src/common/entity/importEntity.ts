/**
 * entity导入表
 * @requires [UserEntity]     - 用户
 * @requires [RoleEntity]     - 角色
 * @requires [ResourceEntity] - 资源
 * @requires [UploadEntity]   - 上传
 * @requires [VideoEntity]    - 视频
 * @requires [DownloadEntity] - 下载
 * @requires [GuessEntity]    - 活动
 * @requires [AdEntity]       - 广告
 */
import { UserEntity } from '../../user/entity/user.entity'
import { RoleEntity } from '../../role/entity/role.entity'
import { ResourceEntity } from '../../resource/entity/resource.entity'
import { UploadEntity } from '../../upload/entity/upload.entity'
import { VideoEntity } from '../../video/entity/video.entity'
import { DownloadEntity } from '../../download/entity/download.entity'
import { GuessEntity } from '../../guess/entity/guess.entity'
import { AdEntity } from '../../ad/entity/ad.entity'

/**
 * allEntity导出
 * @module [allEntity] - 导出的entity数组
 */
export const allEntity: any[] = [
  UserEntity,
  RoleEntity,
  ResourceEntity,
  UploadEntity,
  VideoEntity,
  DownloadEntity,
  GuessEntity,
  AdEntity
]
