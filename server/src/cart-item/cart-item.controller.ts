import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/helpers/roles.guard';
import { CartItemService } from './cart-item.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/decorator/user.decorator';
import { OrderItemDTO } from 'src/order-item/order-item.dto';
import { CartItemDTO } from 'src/cart/cart-item.dto';
@Controller('api/cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Buyer', 'Seller')
  createNewCartItem(@User('userId') userId: string, @Body() data: CartItemDTO) {
    return this.cartItemService.createCartItem(userId, data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Buyer', 'Seller')
  deleteCartItem(
    @User('userId') userId: string,
    @Param('id', ParseUUIDPipe) cartItemId: string,
  ) {
    return this.cartItemService.deleteCartItem(userId, cartItemId);
  }
}
