import { Body, Module } from '@nestjs/common'
import { VideoController } from './video.controller'
import { VideoService } from './video.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VideoEntity } from './video.entity'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

@Module({
  imports: [
    // 连接表
    TypeOrmModule.forFeature([VideoEntity]),
    // 上传文件配置
    MulterModule.register({
      storage: diskStorage({
        destination: "./public/uploads/video",
        filename: (req, file, cb) => {
          const filename = `${req.body.filename}.${req.body.index}`;
          return cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [VideoController],
  providers: [VideoService],
  exports: [VideoService]
})
export class VideoModule {}
