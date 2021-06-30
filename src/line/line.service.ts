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
import { LineEntity } from './line.entity'
import { LineGetDto } from './dto/line.get.dto'

@Injectable()
export class LineService {
  /**
   * 函数
   */
  constructor(
    @InjectRepository(LineEntity)
    private readonly lineRepository: Repository<LineEntity>
  ) { }

  /**
   * 查询所有和条数
   */
  async getManyAndCount(): Promise<any> {
    let data = {
      list: [],
      total: 0
    }
    try {
      const list = await this.lineRepository.createQueryBuilder('line')
        .getManyAndCount();
        console.log('list', list);
      data.list = list[0]
      data.total = list[1]
    } catch (error) {
      throw new HttpException({ error: '获取列表失败' }, 502)
    } finally {
      return data
    }
  }
}
