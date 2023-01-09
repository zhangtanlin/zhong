/**
 * 导入
 * @requires Controller nest模块common导出的控制器
 * @requires Post       nest模块common导出的post请求方式
 * @requires HttpCode   nest模块common导出的http状态码
 * @requires Body       nest模块common导出的Body请求参数
 * @requires Headers    nest模块common导出的Headers请求参数
 */
import {
  HttpException,
  Controller,
  HttpCode,
  UsePipes,
  Get,
  Query,
  Headers,
  Header,
  Res,
} from '@nestjs/common'
import { DownloadService } from './download.service'
import { DtoPipe } from '../common/pipe/dto.pipe'
import { DownloadGetDto } from './dto/user.get.dto'
import { createReadStream } from "fs";

// 下载控制器
@Controller('/api/download')
export class DownloadController {
  /**
   * @function [constructor]     类中定义的构造函数
   * @param    [private]         修饰的属性或方法是私有的，不能在声明它的类的外部访问
   * @param    [readonly]        表示属性或方法只能使用不能修改
   * @param    [downloadService] 服务别名
   * @class    [DownloadService] 服务
   */
  constructor(private readonly downloadService: DownloadService) { }
  /**
   * 请求列表
   * @param     [Get]        请求方式
   * @param     [UsePipes]   管道验证
   * @class     [DtoPipe]    自己写的管道验证器【和DownloadGetDto配合使用】
   * @param     [HttpCode]   请求返回状态码
   * @faunction [Body]       nest提供的获取Body参数的方法
   * @faunction [Query]      query参数
   * @faunction [UserGetDto] 用以验证Body参数正确与否的dto方法
   */
  @Get()
  @UsePipes(DtoPipe)
  @Header('Content-Type', 'application/octet-stream')
  @HttpCode(200)
  async get(@Query() querys: DownloadGetDto, @Res() res) {
    try {
      const list = await this.downloadService.find(querys)
      // 实现文件下载 
      var stream = createReadStream(list[0].url);
      res.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename=app.apk',
      });
      stream.on('data', function (chunk) {
        res.write(chunk, 'binary');
      });
      stream.on('end', function () {
        res.end();
      });
    } catch (error) {
      throw new HttpException({ message: '下载失败' }, 502)
    }
  }
}
