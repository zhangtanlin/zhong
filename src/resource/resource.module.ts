/**
 * 导入
 */
import { Module } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceEntity } from './entity/resource.entity';

@Module({
  imports:[
    /**
     * 连接资源表
     */
    TypeOrmModule.forFeature([ResourceEntity]),
  ],
  controllers: [ResourceController],
  providers: [ResourceService],
})
export class ResourceModule {}
