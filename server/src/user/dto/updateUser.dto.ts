
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {

  @IsString()
  @IsOptional()
  readonly password: string;

  @IsString()
  @IsOptional()
  readonly phone: string;

  @IsString()
  @IsOptional()
  readonly address: string;

  @IsString()
  @IsOptional()
  readonly role: string;

  @IsString()
  @IsOptional()
  readonly sex: string;

  @IsString()
  @IsOptional()
  readonly fullname: string;

  @IsString()
  @IsOptional()
  readonly birthday: Date;
};
