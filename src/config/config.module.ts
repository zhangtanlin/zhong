import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { VersionModule } from "src/version/version.module";
import { ConfigController } from "./config.controller";
import { ConfigService } from "./config.service";
@Module({
  imports: [
    UserModule,
    VersionModule,
  ],
  providers: [ConfigService],
  controllers: [ConfigController],
  exports: [ConfigService]
})
export class ConfigModule {}
