import { IsOptional, IsString } from "class-validator";

export class UpdateRoleDto {
    @IsString()
    @IsOptional()
    readonly role: string;
}