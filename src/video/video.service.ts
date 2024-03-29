import { Injectable, HttpException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { VideoEntity } from './video.entity'
import { Repository, getConnection, Like } from 'typeorm'
import { VideoGetDto } from './dto/video.get.dto'

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>
  ) { }

  // 分页查询
  async getManyAndCount(params: VideoGetDto): Promise<any> {
    let data = {
      list: [],
      total: 0
    }
    try {
      const list = await this.videoRepository.createQueryBuilder('video')
        .where({
          id: Like(`%${params.id ? params.id : ''}%`),
          name: Like(`%${params.name ? params.name : ''}%`),
          type: Like(`%${params.type ? params.type : ''}%`)
        })
        .skip((params.currentPage - 1) * params.pageSize || 0)
        .take(params.pageSize || 0)
        .getManyAndCount()
      data.list = list[0]
      data.total = list[1]
    } catch (error) {
      throw new HttpException({ message: '获取列表失败' }, 502)
    } finally {
      return data
    }
  }

  // 根据条件查询一个用户
  async findOne(data: object): Promise<VideoEntity> {
    try {
      const findOneVideo: VideoEntity = await this.videoRepository.findOne(data)
      if (!findOneVideo) {
        return null
      }
      return findOneVideo
    } catch (error) {
      throw new HttpException({ message: '查询失败' }, 502)
    }
  }

  // 根据id数组查询
  async findByIds(data: any[]): Promise<VideoEntity[]> {
    const findRoleArray = await this.videoRepository
      .createQueryBuilder('role')
      .where('role.id IN (:...ids)', { ids: data })
      .getMany()
    if (!findRoleArray) {
      throw new HttpException({ message: '查询列表失败' }, 502)
    }
    return findRoleArray
  }

  // 保存
  async save(data): Promise<any> {
    const save = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(VideoEntity)
      .values(data)
      .execute()
    if (!save) {
      throw new HttpException({ message: '保存角色失败' }, 502)
    }
    return save
  }
}
