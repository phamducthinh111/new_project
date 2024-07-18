import { IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @IsNotEmpty()
  orderItemsData: { productId: number, quantity: number }[];
}
