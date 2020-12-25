import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from 'src/role/role.service';
import { Repository } from 'typeorm';
import { UserDto } from './dto/dto';
import { UserEntity } from './user.entity';
import { objArrayRepeat } from '../common/utils/tool'

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly roleService: RoleService
  ) { }

  /**
   * 新增
   * @class [UserInsertDto]     新增用户dto
   * @function findOneByAccount 验证账号是否存在
   * @function save             保存用户信息
   */
  async createUser(): Promise<UserDto> {
    try {
      return;
    } catch (error) {
      throw error
    }
  }

  /**
   * 查询所有
   * @function roleFindByIds  根据id数组查询数据
   * @function objArrayRepeat 对象数组去重roleFindByIds
   */
  async findUser(): Promise<UserDto[]> {
    try {
      const cb = [];
      const find: UserEntity[] = await this.userRepository.find();
      if (find.length) {
        for (const iterator of find) {
          let tempFindByIds, tempDto = {}, tempResourcesDto = [];
          if (iterator.roles) {
            const tempIds = iterator.roles.split(',').map(Number);
            tempFindByIds = await this.roleService.findByIds(tempIds);
            if (tempFindByIds.length) {
              for (const i of tempFindByIds) {
                const aaa = tempResourcesDto.concat(i.resources);
                tempResourcesDto = await objArrayRepeat(aaa);
              }
            }
          }
          tempDto = { ...iterator, roles: tempFindByIds || [], resources: tempResourcesDto || [] };
          cb.push(tempDto);
        }
        return cb;
      }
      return [];
    } catch (error) {
      throw error
    }
  }
}
