/**
 * 导入
 */
import { Module, forwardRef } from '@nestjs/common'
import { ResourceController } from './resource.controller'
import { ResourceService } from './resource.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ResourceEntity } from './resource.entity'
import { UserModule } from '../user/user.module'
import { RoleModule } from '../role/role.module'

@Module({
  imports: [
    // 连接资源表
    TypeOrmModule.forFeature([ResourceEntity]),
    forwardRef(() => UserModule),
    forwardRef(() => RoleModule)
  ],
  providers: [ResourceService],
  controllers: [ResourceController],
  exports: [ResourceService]
})
export class ResourceModule {}
