import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserControler } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entity";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService],
    controllers: [UserControler],
    exports: [UserService],
})
export class UserModule {}