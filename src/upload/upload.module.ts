import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadEntity } from './entity/upload.entity';
@Module({
  imports: [
    // 连接上传表
    TypeOrmModule.forFeature([UploadEntity]),
  ],
  providers: [
    UploadService,
  ],
  controllers: [
    UploadController,
  ],
  exports: [
    UploadService,
  ]
})
export class UploadModule {}
