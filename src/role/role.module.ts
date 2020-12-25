import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceEntity } from 'src/resource/resource.entity';
import { ResourceModule } from 'src/resource/resource.module';
import { ResourceService } from 'src/resource/resource.service';
import { RoleEntity } from './role.entity';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity]),
    TypeOrmModule.forFeature([ResourceEntity]),
    ResourceModule
  ],
  providers: [RoleResolver, RoleService, ResourceService],
  exports: [RoleService]
})
export class RoleModule { }
