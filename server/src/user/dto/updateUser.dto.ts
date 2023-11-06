
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
//   @IsString()
//   @IsNotEmpty()
//   readonly username: String;

//   @IsEmail()
//   @IsNotEmpty()
//   readonly email: String;

  @IsString()
  @IsNotEmpty()
  readonly password: String;

  @IsString()
  @IsNotEmpty()
  readonly phone: String;

  @IsString()
  @IsNotEmpty()
  readonly address: String;

  @IsString()
  @IsNotEmpty()
  readonly isAdmin: String;
};
