/**
 * 返回dto验证
 * @param {number} [code]    - 状态码【规则在http编码中间添加0.例如http状态码是416，这里采用4016】
 * @param {string} [message] - 提示信息
 * @param {any}    [data]    - 返回值返回值可能是string/array/object/boolean/date/……
 */
export class ResultDto {
  code: number

  message: string

  data: any
}
