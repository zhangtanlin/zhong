import {
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsNumber,
} from 'class-validator'
import { Type } from 'class-transformer'

// 视频上传之前验证参数
export class VideoUploadBeforeDto {

  @Type(() => Number)
  @IsNotEmpty({ message: '视频大小不能为空' })
  @IsInt({ message: '视频大小需要为数字' })
  @Min(0, { message: '视频最小为 $constraint1 ,但实际为 $value ' })
  @Max(209715200, { message: '视频最大为 $constraint1 ' }) // 200M = 200 * 1024 *1024 = 209715200
  size: number
  
  @Type(() => Number)
  @IsNotEmpty({ message: '分片大小不能为空' })
  @Min(0, { message: '分片最小为 $constraint1 ,但实际为 $value' })
  @Max(10485760, { message: '分片最大为 $constraint1 ,但实际为 $value' }) // 10M = 10 * 1024 * 1024 = 10485760
  chunkSize: number
  
  @Type(() => Number)
  @IsNotEmpty({ message: '分片个数总数不能为空' })
  @Min(0, { message: '分片个数最小为 $constraint1 ,但实际为 $value' })
  @Max(200, { message: '分片个数最大为 $constraint1 ,但实际为 $value' })
  chunkTotal: number
  
  @Type(() => String)
  @IsNotEmpty({ message: '视频的md5不能为空' })
  md5: string

  @IsOptional()
  @IsNotEmpty({ message: '未上传的分片序号不能为空' })
  @IsNumber({}, { each: true })
  notUploadArray: string[]
}
