import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadEntity } from './entity/upload.entity';
import { Repository } from 'typeorm';
import { Md5Dto } from '../common/dto/md5.dto';
import Ioredis from 'ioredis'
import path from 'path'
import {
  readFileBuffer,
  saveFileBuffer,
  unlinkFile,
} from "../common/utils/file";
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(UploadEntity)
    private readonly uploadRepository: Repository<UploadEntity>,
    @InjectRedis()
    private readonly ioredis: Ioredis,
    private readonly configService: ConfigService,
  ) { }

  /**
   * 根据md5查询一条数据
   * @param {object} [body] - id查询条件的dto验证
   */
  async getOneByMd5(body: Md5Dto): Promise<UploadBeforeType> {
    let cb: UploadBeforeType = {
      uploaded: false,
      part: []
    }
    try {
      const findOne = await this.uploadRepository.findOneBy(body)
      if (!!findOne) {
        cb.uploaded = true
        const getRedis: any = await this.ioredis.zrange(body.md5, 0, -1) || [];
        cb.part = getRedis || []
      }
      return cb
    } catch (error) {
      throw new HttpException({ message: '查询失败' }, 502)
    }
  }

  // 视频上传
  async upload(bodys: any): Promise<any> {
    // 返回值{chunk:表示 当前分片是否上传成功,upload:上传是否成功}
    let cb = {
      chunk: false,
      upload: false
    }
    try {
      let { md5, file, chunkNumber, chunkAll, fileName } = bodys;
      // 数据库是否存在md5
      const findOne: UploadEntity = await this.uploadRepository.findOneBy({
        md5
      })
      if (!!findOne) {
        throw new HttpException({ message: '当前文件已存在' }, 502)
      }
      // 存储二进制文件
      const writeFilesName = md5 + "_" + chunkNumber;
      const writeFilesBuffer = file['buffer'];
      const saveFile = await saveFileBuffer({
        fileName: writeFilesName,
        buffer: writeFilesBuffer,
        filePath: this.configService.get('UPLOAD_VIDEO_BASEURL'),
      });
      if (!saveFile) {
        throw new HttpException({ message: '存储文件失败' }, 502)
      }
      // 验证redis里面是否存在当前分片【无论存不存在都更新里面的数据】
      await this.ioredis.zadd(md5, chunkNumber, chunkNumber); // 同步添加一条有序数组
      // 分片是否已经全部上传
      const mergeRedis = await this.ioredis.zcard(md5);
      if (Number(mergeRedis) === Number(chunkAll)) {
        // 合并模块
        let bufferArray = [];
        for (let index = 0; index < Number(mergeRedis); index++) {
          let readBuffer = await readFileBuffer({
            fileName: md5 + "_" + index,
            filePath: this.configService.get('UPLOAD_VIDEO_BASEURL'),
          });
          bufferArray.push(readBuffer);
        }
        const newBufferFile = Buffer.concat(bufferArray);
        const mergeFile = await saveFileBuffer({
          fileName,
          buffer: newBufferFile,
          filePath: this.configService.get('UPLOAD_VIDEO_BASEURL'),
        });
        if (!mergeFile) {
          throw new HttpException({ message: '合并文件失败' }, 502)
        }
        // 存储数据库
        const obj = {
          type: 2,
          name: path.basename(fileName, path.extname(fileName)),
          md5,
          suffix: path.extname(fileName)
        }
        const save: UploadEntity = await this.uploadRepository.save(obj)
        if (!save) {
          throw new HttpException({ message: '存储数据库失败' }, 502)
        }
        // 删除临时数据
        for (let index = 0; index < Number(mergeRedis); index++) {
          await unlinkFile({
            fileName: md5 + "_" + index,
            filePath: this.configService.get('UPLOAD_VIDEO_BASEURL'),
          }
          ); // 删除缓存文件
        }
        this.ioredis.del(md5); // 清除redis里的数据
        cb.upload = true;
        cb.chunk = true;
      } else {
        cb.chunk = true;
      }
    } catch (error) {
      cb = {
        chunk: false,
        upload: false
      }
    }
    return cb;
  }
}
