/**
 * 导入
 * BadRequestException           - 400【抛出的异常】
 * UnauthorizedException         - 401【抛出的异常】
 * NotFoundException             - 404【抛出的异常】
 * ForbiddenException            - 403【抛出的异常】
 * NotAcceptableException        - 406【抛出的异常】
 * RequestTimeoutException       - 408【抛出的异常】
 * ConflictException             - 409【抛出的异常】
 * GoneException                 - 410【抛出的异常】
 * PayloadTooLargeException      - 413【抛出的异常】
 * UnsupportedMediaTypeException - 400【抛出的异常】
 * UnprocessableEntityException  - 422【抛出的异常】
 * InternalServerErrorException  - 500【抛出的异常】
 * NotImplementedException       - 501【抛出的异常】
 * BadGatewayException           - 502【抛出的异常】
 * ServiceUnavailableException   - 503【抛出的异常】
 * GatewayTimeoutException       - 504【抛出的异常】
 * @requires [Injectable]        - nest的common模块导出的
 * @requires [InjectRepository]  - nestjs/typeorm导出的
 * @requires [Repository]        - typeorm导出的
 */
import { Injectable, HttpException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DownloadEntity } from './entity/download.entity'
import { DownloadGetDto } from './dto/user.get.dto'

@Injectable()
export class DownloadService {
  /**
   * 函数
   */
  constructor(
    @InjectRepository(DownloadEntity)
    private readonly downloadRepository: Repository<DownloadEntity>
  ) { }

  /**
   * 查询用户【根据params条件】
   */
  async find(querys: any): Promise<DownloadEntity[]> {
    const data: any = await this.downloadRepository.find()
    if (!data) {
      throw new HttpException({ message: '获取下载地址失败' }, 502)
    }
    return data
  }
}
