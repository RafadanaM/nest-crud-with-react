import { IsInt, IsNumber, IsString, IsUUID } from 'class-validator';

export class OrderItemDTO {
  @IsInt()
  quantity: number;
}
