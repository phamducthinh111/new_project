import { IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export class CreateOrderItemDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  orderId: number; 
}
