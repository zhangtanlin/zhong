import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entity/role.entity';
import { ResourceModule } from '../resource/resource.module';

@Module({
  imports: [
    /**
     * 连接角色表
     */
    TypeOrmModule.forFeature([RoleEntity]),
    ResourceModule
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
