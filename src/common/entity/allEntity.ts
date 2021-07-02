/**
 * entity导入表
 * @requires [AdminEntity]    - 管理员
 * @requires [UserEntity]     - 用户
 * @requires [RoleEntity]     - 角色
 * @requires [ResourceEntity] - 资源
 * @requires [UploadEntity]   - 上传
 * @requires [VideoEntity]    - 视频
 * @requires [DownloadEntity] - 下载
 * @requires [GuessEntity]    - 活动
 * @requires [AdEntity]       - 广告
 * @requires [LineEntity]     - 线路
 * @requires [VersionEntity]  - 版本号
 */
import { AdminEntity } from 'src/admin/admin.entity'
import { UserEntity } from '../../user/user.entity'
import { RoleEntity } from '../../role/entity/role.entity'
import { ResourceEntity } from '../../resource/entity/resource.entity'
import { UploadEntity } from '../../upload/entity/upload.entity'
import { VideoEntity } from '../../video/entity/video.entity'
import { DownloadEntity } from '../../download/entity/download.entity'
import { GuessEntity } from '../../guess/entity/guess.entity'
import { AdEntity } from '../../ad/ad.entity'
import { LineEntity } from 'src/line/line.entity'
import { VersionEntity } from 'src/version/version.entity'

/**
 * allEntity导出
 * @module [allEntity] - 导出的entity数组
 */
export const allEntity: any[] = [
  AdminEntity,
  UserEntity,
  RoleEntity,
  ResourceEntity,
  UploadEntity,
  VideoEntity,
  DownloadEntity,
  GuessEntity,
  AdEntity,
  LineEntity,
  VersionEntity
]
