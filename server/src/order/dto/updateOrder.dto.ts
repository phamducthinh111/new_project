import { IsString, IsDate, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateOrderDto {

  @IsNotEmpty()
  @IsString()
  status: string;
}
