import { IsDefined, IsInt, IsUUID } from 'class-validator';

export class CartItemDTO {
  @IsDefined()
  @IsUUID()
  productId: string;

  @IsDefined()
  @IsInt()
  quantity: number;
}
