import {
  Body,
  Controller,
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
import { CartService } from './cart.service';

@Controller('api/cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  createNewOrder() {
    return this.cartService.createCart('f86fed85-2cfd-46c8-a71b-87b2b0dd5cce');
  }

  @Get()
  getOneCart() {
    return this.cartService.getOneCart('f86fed85-2cfd-46c8-a71b-87b2b0dd5cce');
  }

  @Post('/product/:id/add')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Buyer', 'Seller')
  @UsePipes(ValidationPipe)
  createNewCartItem(
    @User('userId') userId: string,
    @Param('id', ParseUUIDPipe) productId: string,
    @Body() data: OrderItemDTO,
  ) {
    return this.cartService.addItemToCart(productId, userId, data);
  }
}
