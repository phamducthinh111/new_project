import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  total: number;


}
