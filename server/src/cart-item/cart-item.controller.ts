import {
  Body,
  Controller,
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

  // @Post(':id')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles('Buyer', 'Seller')
  // @UsePipes(ValidationPipe)
  // createNewCartItem(
  //   @User('userId') userId: string,
  //   @Param('id', ParseUUIDPipe) productId: string,
  //   @Body() data: OrderItemDTO,
  // ) {
  //   return this.cartItemService.createCartItem(productId, userId, data);
  // }
}
