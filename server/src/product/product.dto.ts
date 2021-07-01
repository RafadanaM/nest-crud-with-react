import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OrderItemDTO } from 'src/order-item/order-item.dto';
import { OrderDTO } from 'src/order/order.dto';
import { UserResponseObject } from 'src/user/user.dto';

export class ProductDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;
}

export class ProductResponseObject {
  id?: string;
  createdDate: Date;
  updated: Date;
  price: number;
  name: string;
  description: string;
  creator: UserResponseObject;
}

export class buyDTO {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => OrderDTO)
  order: OrderDTO;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => OrderItemDTO)
  item: OrderItemDTO;
}
