import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdModule } from "src/ad/ad.module";
import { UserModule } from "src/user/user.module";
import { VersionModule } from "src/version/version.module";
import { SystemConfigEntity } from "./system.config.entity";
import { 
  SystemController,
  SystemConfigController,
} from "./system.controller";
import { SystemService } from "./system.service";
@Module({
  imports: [
    // 连接用户表
    TypeOrmModule.forFeature([SystemConfigEntity]),
    UserModule,
    VersionModule,
    AdModule,
  ],
  providers: [SystemService],
  controllers: [
    SystemController,
    SystemConfigController,
  ],
  exports: [SystemService]
})
export class SystemModule { }
