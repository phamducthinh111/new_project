
import { IsString, IsEmail, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: String;

  @IsEmail()
  @IsNotEmpty()
  readonly email: String;

  @IsString()
  @IsNotEmpty()
  readonly password: String;

  @IsString()
  @IsNotEmpty()
  readonly phone: String;

  @IsString()
  @IsNotEmpty()
  readonly address: String;
};
