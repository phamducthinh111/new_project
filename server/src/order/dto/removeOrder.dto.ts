import { IsString, IsNotEmpty } from 'class-validator';

export class RemoveOrderDto {
  @IsNotEmpty()
  @IsString()
  desc: string;
}
