import { Controller, Post } from '@nestjs/common';
import { CartItemService } from './cart-item.service';

@Controller('api/cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  createNewOrderItem() {
    return this.cartItemService.createCartItem(
      'db1e9ba3-e99e-4031-a81e-c270f66caee0',
      'f86fed85-2cfd-46c8-a71b-87b2b0dd5cce',
    );
  }
}
