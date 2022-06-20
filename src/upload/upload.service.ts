import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadEntity } from './entity/upload.entity';
import { Repository } from 'typeorm';
import { Md5Dto } from '../common/dto/md5.dto';
import { RedisService } from 'nestjs-redis';
import * as path from 'path'
import { saveFileBuffer, readFileBuffer, unlinkFile } from "../common/utils/tool"
import { rejects } from 'assert';
import { resolve } from 'dns';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(UploadEntity)
    private readonly uploadRepository: Repository<UploadEntity>,
    private readonly redisService: RedisService,
  ) {}

  /**
   * 根据md5查询一条数据
   * @param {object} [body] - id查询条件的dto验证
   */
  async getOneByMd5(body: Md5Dto): Promise<any> {
    let cb = {
      uploaded: false,
      part: null
    }
    try {
      const findOne: UploadEntity = await this.uploadRepository.findOne(body)
      if (!!findOne) {
        cb.uploaded = true
        return
      }
      const client = this.redisService.getClient()
      const getRedis = await client.zrange(body.md5, 0, -1);
      cb.part = getRedis || []
      return 
    } catch (error) {
      throw new HttpException({ message: '查询失败' }, 502)
    } finally {
      return cb
    }
  }

  /**
   * 上传
   */
  async upload(bodys: any): Promise<any> {
    // 返回值{chunk:表示 当前分片是否上传成功,upload:上传是否成功}
    let cb = {
      chunk: false,
      upload: false
    }
    try {
      let { md5, file, chunkNumber, chunkAll, fileName } = bodys;
      // 数据库是否存在md5
      const findOne: UploadEntity = await this.uploadRepository.findOne({ md5 })
      if (!!findOne) {
        throw new HttpException({ message: '当前文件已存在' }, 502)
      }
      // 存储二进制文件
      const writeFilesName = md5 + "_" + chunkNumber;
      const writeFilesBuffer = file['buffer'];
      const saveFile = await saveFileBuffer(writeFilesName, writeFilesBuffer);
      if (!saveFile) {
        throw new HttpException({ message: '存储文件失败' }, 502)
      }
      // 验证redis里面是否存在当前分片【无论存不存在都更新里面的数据】
      const client = this.redisService.getClient()
      await client.zadd(md5, chunkNumber, chunkNumber); // 同步添加一条有序数组
      // 分片是否已经全部上传
      const mergeRedis = await client.zcard(md5);
      if (Number(mergeRedis) === Number(chunkAll)) {
        // 合并模块
        let bufferArray = [];
        for (let index = 0; index < Number(mergeRedis); index++){
          let readBuffer = await readFileBuffer(md5 + "_" + index);
          bufferArray.push(readBuffer);
        }
        const newBufferFile = Buffer.concat(bufferArray);
        const mergeFile = await saveFileBuffer(fileName, newBufferFile)
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
        for (let index = 0; index < Number(mergeRedis); index++){
          await unlinkFile(md5 + "_" + index); // 删除缓存文件
        } 
        client.del(md5); // 清除redis里的数据
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
