import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BaiduController } from './baidu.controller'
import { BaiduService } from './baidu.service'
import { BaiduEntity } from './baidu.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([BaiduEntity]),
  ],
  controllers: [BaiduController],
  providers: [BaiduService],
  exports: [BaiduService]
})
export class BaiduModule {}
