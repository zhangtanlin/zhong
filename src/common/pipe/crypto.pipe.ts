import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { privateDecryptFn } from '../utils/cryptoData'

// 全局解密客户端参数
@Injectable()
export class CryptoPipe implements PipeTransform {
  // @function [toValidate] - 类里面定义的一个局部作用域的方法
  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object]
    return !types.find((type) => metatype === type)
  }
  /**
   * @function [transform]          - 管道方法提供的自有方法
   * @param    [transform.value]    - 数据
   * @param    [transform.metatype] - 管道调用时验证的dto类【这里是控制器（新增用户）方法里面关联的UserAddDto验证方法】
   * @param    [object]             - 使用plainToClass方法把json转换成类【这里是把客户端参数value，转换成metatype类（此处是UserAddDto类）】
   * @function [validate]           - class-validator内根据给定验证模式验证给定对象的方法【参数：验证模式，对象，验证参数】
   * @returns 
   */
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (
      !metatype ||
      !this.toValidate(metatype) ||
      !Object.keys(value).length
    ) {
      return value
    }
    try {
      const tempEncryptData = await privateDecryptFn(
        value.data
      );
      const object = plainToClass(metatype, tempEncryptData)
      const errors = await validate(object)
      if (errors.length > 0) {
        throw new BadRequestException({
          message: '请求参数错误',
          error: errors,
        })
      }
      return tempEncryptData
    } catch (error) {
      return value
    }
  }
}
