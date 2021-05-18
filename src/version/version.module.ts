import { Module } from "@nestjs/common";
import { VersionController } from "./version.controller";
import { VersionService } from "./version.service";
@Module({
  providers: [VersionService],
  controllers: [VersionController],
  exports: [VersionService]
})
export class VersionModule {}
