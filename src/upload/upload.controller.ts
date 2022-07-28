import { Controller, Post, UsePipes, UseGuards, HttpCode, Body, HttpException, UseInterceptors, UploadedFile, UploadedFiles, Res, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { DtoPipe } from '../common/pipe/dto.pipe';
import { AuthApiGuard } from '../common/guard/auth_api.guard';
import { ResultDto } from '../common/dto/result.dto';
import { Md5Dto } from '../common/dto/md5.dto';
import { UploadService } from './upload.service';
import { from, Observable } from 'rxjs';

@Controller('/admin/upload')
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

  // 上传视频之前验证
  @Post('/video_before')
  @UsePipes(DtoPipe)
  @UseGuards(AuthApiGuard)
  @HttpCode(200)
  async uploadBeforeImg(@Body() bodys: Md5Dto): Promise<UploadBeforeType> {
    return this.uploadService.getOneByMd5(bodys);
  }

  // 上传视频
  @Post('/video')
  @UsePipes(DtoPipe)
  @UseGuards(AuthApiGuard)
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(200)
  uploadFile(@UploadedFile() file, @Body() bodys): Observable<any> {
    const { md5, chunkNumber, chunkAll, fileName }  = bodys
    const temporaryObject = {
      file,
      md5,
      chunkNumber,
      chunkAll,
      fileName
    }
    return from(this.uploadService.upload(
      temporaryObject
    ))
  }
}
