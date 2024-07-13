import { IsOptional, IsNumber, IsString } from "class-validator";

export class UpdateProductDto {
  @IsNumber()
  @IsOptional()
  readonly quantity: number;

  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsNumber()
  @IsOptional()
  readonly price: number;

  @IsString()
  @IsOptional()
  readonly typeName: string;

  @IsString()
  @IsOptional()
  readonly location: string;

  @IsString()
  @IsOptional()
  readonly label: string;
}