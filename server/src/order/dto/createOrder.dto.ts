import { IsNotEmpty, IsNumber, IsArray, IsString, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @IsNotEmpty()
  orderItemsData: { productId: number, quantity: number }[];

  @IsString()
  @IsOptional()
  readonly note: string;
}
