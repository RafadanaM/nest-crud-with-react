import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/roles.decorator';
import { User } from 'src/decorator/user.decorator';
import { RolesGuard } from 'src/helpers/roles.guard';
import { OrderItemDTO } from 'src/order-item/order-item.dto';
import { CartItemDTO } from './cart-item.dto';
import { CartService } from './cart.service';

@Controller('api/cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  createNewOrder() {
    return this.cartService.createCart('f86fed85-2cfd-46c8-a71b-87b2b0dd5cce');
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Buyer', 'Seller')
  getOneCart(@User('userId') userId: string) {
    return this.cartService.getOneCart(userId);
  }

  @Post('/item')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Buyer', 'Seller')
  @UsePipes(ValidationPipe)
  createNewCartItem(
    @User('userId') userId: string,
    @Param('id', ParseUUIDPipe) productId: string,
    @Body() data: CartItemDTO,
  ) {
    return this.cartService.addItem(productId, userId, data);
  }

  @Delete('/item/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Buyer', 'Seller')
  @UsePipes(ValidationPipe)
  deleteCartItem(
    @User('userId') userId: string,
    @Param('id', ParseUUIDPipe) productId: string,
  ) {
    return this.cartService.deleteItem(productId, userId);
  }
}
