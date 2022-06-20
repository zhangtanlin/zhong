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
import { AdEntity } from './ad.entity'
import { AdGetDto } from './dto/ad.get.dto'

@Injectable()
export class AdService {
  /**
   * 函数
   */
  constructor(
    @InjectRepository(AdEntity)
    private readonly adRepository: Repository<AdEntity>
  ) { }

  /**
   * 分页查询
   * @param {object} [data] - 含有列表和总条数的对象返回值
   * @function [list] - typeorm的模糊查询+统计
   */
  async getManyAndCount(querys: AdGetDto): Promise<AdEntity[]> {
    let data = []
    try {
      data = await this.adRepository.createQueryBuilder('ad')
        .where('ad.type like :type')
        .setParameters({
          type: `%${querys.type ? querys.type : ''}%`, // 账号
        })
        .getMany();
    } catch (error) {
      throw new HttpException({ message: '获取列表失败' }, 502)
    } finally {
      return data
    }
  }
}
