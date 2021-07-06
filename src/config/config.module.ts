import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdModule } from "src/ad/ad.module";
import { UserModule } from "src/user/user.module";
import { VersionModule } from "src/version/version.module";
import { ConfigController } from "./config.controller";
import { ConfigEntity } from "./config.entity";
import { ConfigService } from "./config.service";
@Module({
  imports: [
    /**
     * 连接用户表
     */
    TypeOrmModule.forFeature([ConfigEntity]),
    UserModule,
    VersionModule,
    AdModule,
  ],
  providers: [ConfigService],
  controllers: [ConfigController],
  exports: [ConfigService]
})
export class ConfigModule {}
