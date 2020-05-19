import { Module } from '@nestjs/common'
import { VideoController } from './video.controller'
import { VideoService } from './video.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VideoEntity } from './entity/video.entity'

@Module({
  imports: [
    /**
     * 连接表
     */
    TypeOrmModule.forFeature([VideoEntity])
  ],
  controllers: [VideoController],
  providers: [VideoService],
  exports: [VideoService]
})
export class VideoModule {}
