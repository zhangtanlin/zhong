import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { AdminEntity } from "./admin.entity";
import { RoleModule } from "../role/role.module";
@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    RoleModule,
  ],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService]
})
export class AdminModule {}
