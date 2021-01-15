import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadEntity } from './entity/upload.entity';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    /**
     * 连接用户表
     */
    TypeOrmModule.forFeature([UploadEntity])
  ],
  providers: [UploadService],
  controllers: [UploadController]
})
export class UploadModule {}
