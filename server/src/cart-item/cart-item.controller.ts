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
@Controller('api/cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  // @Delete(':id')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles('Buyer', 'Seller')
  // @UsePipes(ValidationPipe)
  // createNewCartItem(
  //   @User('userId') userId: string,
  //   @Param('id', ParseUUIDPipe) productId: string,
  // ) {
  //   return this.cartItemService.deleteCartItem(productId, userId);
  // }
}
