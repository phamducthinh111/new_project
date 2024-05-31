import { IsNotEmpty, IsString } from "class-validator";

export  class PasswordProfileDto {
    @IsString()
    @IsNotEmpty()
    readonly currentPassword: string;

    @IsString()
    @IsNotEmpty()
    readonly newPassword: string;
}