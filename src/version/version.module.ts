import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VersionController } from "./version.controller";
import { VersionEntity } from "./version.entity";
import { VersionService } from "./version.service";
@Module({
  imports: [
    TypeOrmModule.forFeature([VersionEntity]),
  ],
  providers: [VersionService],
  controllers: [VersionController],
  exports: [VersionService]
})
export class VersionModule {}
