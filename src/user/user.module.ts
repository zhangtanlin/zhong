import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceEntity } from 'src/resource/resource.entity';
import { ResourceService } from 'src/resource/resource.service';
import { RoleEntity } from 'src/role/role.entity';
import { RoleModule } from '../role/role.module';
import { RoleService } from '../role/role.service';
import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([RoleEntity]),
    TypeOrmModule.forFeature([ResourceEntity]),
    RoleModule
  ],
  providers: [UserResolver, UserService, RoleService, ResourceService]
})
export class UserModule { }
