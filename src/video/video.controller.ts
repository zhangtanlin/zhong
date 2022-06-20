import {
  HttpException,
  Controller,
  Post,
  HttpCode,
  Body,
  UsePipes,
  Get,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
  Headers,
  Request,
} from '@nestjs/common'
import { RedisService } from 'nestjs-redis'
import { VideoService } from './video.service'
import { DtoPipe } from '../common/pipe/dto.pipe'
import { VideoGetDto } from './dto/video.get.dto'
import { VideoAddDto } from './dto/video.add.dto'
import { VideoUploadBeforeDto } from './dto/video.upload.before.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthAdminGuard } from 'src/common/guard/auth_admin.guard'

@Controller('/admin/video')
export class VideoController {

  constructor(
    private readonly videoService: VideoService,
    private readonly redisService: RedisService
  ) {}

  // 查询列表【有分页条件就分页查询，没有分页查询就查询所有】
  @Get()
  @UsePipes(DtoPipe)
  @HttpCode(200)
  async get(@Query() querys: VideoGetDto): Promise<any> {
    let data = null
    try {
      const list = await this.videoService.getManyAndCount(querys)
      if (!list) {
        throw new HttpException({ message: '获取列表失败' }, 500)
      }
      return list
    } catch (error) {
      throw new HttpException(
        error.response,
        error.status,
      )
    }
  }
  // 新增
  @Post('/add')
  @UsePipes(DtoPipe)
  @UseGuards(AuthAdminGuard)
  @HttpCode(200)
  async add(@Body() request: VideoAddDto): Promise<any> {
    try {
      const data = await this.videoService.save(request)
      if (!data) {
        throw new HttpException({ message: '获取列表失败' }, 500)
      }
      return data
    } catch (error) {
      throw new HttpException(
        error.response,
        error.status,
      )
    }
  }
  // 编辑
  async edit(@Body() request: VideoAddDto): Promise<any> {
    try {
      const data = '编辑成功'
      return data
    } catch (error) {
      throw new HttpException(
        error.response,
        error.status,
      )
    }
  }

  // 视频上传之前
  @Post('/uploadBefore')
  @UsePipes(DtoPipe)
  @UseGuards(AuthAdminGuard)
  @HttpCode(200)
  async uploadBefore(@Body() bodys: VideoUploadBeforeDto) : Promise<any> {
    let cb = {
      isUpload: false,
      notUploadArray: []
    }
    try {
      const md5 = bodys.md5
      const redisClient = this.redisService.getClient()
      const getVideoUploadArray = await redisClient.get('videoUpload:' + md5)
      if (!getVideoUploadArray) {
        // 如果redis里面没有数据，就查一遍数据库看是否存在
        const findOneVideo = await this.videoService.findOne({md5})
        if (!!findOneVideo) {
          cb.isUpload = true;
        } else {
          cb.isUpload = false;
        }
      } else {
        cb.notUploadArray = getVideoUploadArray.split('')
      }
      return cb
    } catch (error) {
      throw new HttpException({ message: '上传检测失败' }, 401)
    }
  }

  // 视频上传
  @Post('/upload')
  @UsePipes(DtoPipe)
  @UseGuards(AuthAdminGuard)
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() bodys,
  ) {
    // console.log('files', file)
    // console.log('bodys', bodys)
    return 'upload'
  }
}
