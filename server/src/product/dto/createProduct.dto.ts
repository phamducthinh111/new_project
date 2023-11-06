import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;

  @IsString()
  @IsNotEmpty()
  readonly name: String;

  @IsString()
  @IsNotEmpty()
  readonly desc: String;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
  
  // @IsString()
  // @IsNotEmpty()
  // readonly imageUrl: String;

  @IsString()
  @IsNotEmpty()
  readonly type: String;

  @IsString()
  @IsNotEmpty()
  readonly loc: String;
}