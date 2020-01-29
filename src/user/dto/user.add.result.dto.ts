/**
 * 导入
 * @requires [ApiModelProperty] - api文档【标注sawgger可访问的类属性】
 */
import { ApiModelProperty } from '@nestjs/swagger'
import { UserAddDto } from './user.add.dto'

/**
 * 新增用户返回dto验证
 */
export class UserAddResultDto {
  @ApiModelProperty()
  code: number;

  @ApiModelProperty()
  message: string;

  @ApiModelProperty()
  data: UserAddDto;
}
