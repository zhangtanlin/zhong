import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceEntity } from './resource.entity';
import { ResourceResolver } from './resource.resolver';
import { ResourceService } from './resource.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResourceEntity])
  ],
  providers: [ResourceResolver, ResourceService],
  exports: [ResourceService]
})
export class ResourceModule { }
