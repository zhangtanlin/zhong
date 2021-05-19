import { Controller, Post, UsePipes, UseGuards, HttpCode, Body, HttpException, UseInterceptors, UploadedFile, UploadedFiles, Res, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { DtoPipe } from '../common/pipe/dto.pipe';
import { AuthApiGuard } from '../common/guard/auth_api.guard';
import { ResultDto } from '../common/dto/result.dto';
import { Md5Dto } from '../common/dto/md5.dto';
import { UploadService } from './upload.service';

@Controller('/api/upload')
export class UploadController {

  /**
   * @function [constructor] - 类中定义的构造函数
   * @param    [private]     - 修饰的属性或方法是私有的，不能在声明它的类的外部访问
   * @param    [readonly]    - 表示属性或方法只能使用不能修改
   * @description [参考文档] - https://www.codeleading.com/article/57672160642/
   */
  constructor(
    private readonly uploadService: UploadService
  ) {}

  /**
   * 上传之前验证
   */
  @Post('/before')
  @UsePipes(DtoPipe)
  @UseGuards(AuthApiGuard)
  @HttpCode(200)
  async uploadBeforeImg(@Body() bodys: Md5Dto): Promise<ResultDto> {
    let cb: ResultDto = {
      code: 200,
      data: {
        uploaded: false, // 是否已经上传成功
        part: [] // 哪些片段未上传
      },
      message: '成功'
    }
    try {
      cb.data = await this.uploadService.getOneByMd5(bodys);
    } catch (error) {
      cb.code = error.status;
      cb.message = error.message.error;
    } finally {
      return cb
    }
  }

  /**
   * 上传
   */
  @Post('/')
  @UsePipes(DtoPipe)
  @UseGuards(AuthApiGuard)
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(200)
  async uploadFile(@UploadedFile() file, @Body() bodys): Promise<ResultDto> {
    let cb: ResultDto = {
      code: 200,
      message: '成功',
      data: {
        chunk: false,
        upload: false
      }
    }
    const { md5, chunkNumber, chunkAll, fileName }  = bodys
    try {
      const temporaryObject = {
        file,
        md5,
        chunkNumber,
        chunkAll,
        fileName
      }
      cb.data = await this.uploadService.upload(temporaryObject)
    } catch (error) {
      cb.code = error.status;
      cb.message = error.message.error;
    } finally {
      return cb
    }
  }
}
