import { Module } from "@nestjs/common";
import { SystemController } from "./system.controller";
import { SystemService } from "./system.service";
@Module({
  providers: [SystemService],
  controllers: [SystemController],
  exports: [SystemService]
})
export class SystemModule {}
